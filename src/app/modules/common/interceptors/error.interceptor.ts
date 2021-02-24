import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';

import { ModalService } from '@alpha-smart/ui/lib/modules/dialog/services/modal.service';

import { Observable, throwError, timer } from 'rxjs';
import { catchError, mergeMap, retryWhen, tap } from 'rxjs/operators';

import { ErrorRequestComponent } from '../modules/error-request/error-request.component';

const httpLoses: { [key: string]: number } = {};
let isDialogOpened: boolean = false;


export interface RetryParams {
    maxAttempts?: number;
    scalingDuration?: number;
    shouldRetry?: ({ status: number }) => boolean;
}

const defaultParams: RetryParams = {
    maxAttempts: 3,
    scalingDuration: 1000,
    shouldRetry: ({ status }) => status >= 400,
};

export const genericRetryStrategy = (params: RetryParams = {}, modalService: ModalService, url: string) => {
    return (attempts: Observable<any>) => {
        return attempts.pipe(
            mergeMap((error, i) => {

                const { maxAttempts, scalingDuration, shouldRetry } = { ...defaultParams, ...params };
                const retryAttempt = i + 1;

                console.warn(`Attempt ${retryAttempt}: retrying in ${retryAttempt * scalingDuration}ms`);

                if (retryAttempt > maxAttempts || !shouldRetry(error) || error.status === 403) {
                    return throwError(error);
                }

                httpLoses[url] = (httpLoses[url] || 0) + 1;
                if (retryAttempt === params.maxAttempts && !isDialogOpened) {
                    isDialogOpened = true;
                    modalService.showModal(ErrorRequestComponent, {
                        data: httpLoses,
                        width: '800px',
                        whenClosed: () => isDialogOpened = false,
                    });
                }
                return timer(retryAttempt * scalingDuration);
            }),
            catchError((err) => {
                return throwError(err);
            })
        );
    };
};

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    private _modalService: ModalService;
    constructor(inj: Injector) {
        this._modalService = inj.get(ModalService);
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const { shouldRetry } = this;
        return next.handle(request)
            .pipe(retryWhen(genericRetryStrategy(defaultParams, this._modalService, request.url)));
    }

    private shouldRetry = (error) => error.status > 299 && error.status !== 403;
}