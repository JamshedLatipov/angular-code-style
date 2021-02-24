import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpClient,
} from '@angular/common/http';

import { ECookieKeys } from '@alpha-smart/utils/enums/auth.enum';

import { EMPTY, Observable, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { CookieService } from '../services/cookie.service';
import { SettingsService } from '../services/settings.service';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';

declare var $: any;

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  public options: any = {
    autoClose: true,
    keepAfterRouteChange: false,
  };

  private AUTH_HEADER = 'Authorization';
  private environment: any;

  constructor(
    @Inject(DOCUMENT)
    private document: Document,
    private router: Router,
    private http: HttpClient,
    private _cookieService: CookieService,
    private _settingsService: SettingsService,
    // private _toastrService: ToastrService,
  ) { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    // console.log('interceptor');
    if (!req.headers.has('Content-Type')) {
      req = req.clone({
        headers: req.headers.set('Content-Type', 'application/json'),
      });
    }
    // $("#mediumModal").show();
    // $("#mediumModal").modal('toggle');
    // localStorage.setItem("waitserver", JSON.stringify(false));
    req = this.addAuthenticationToken(req);
    // console.log('works interceptor 2', req);
    return next.handle(req).pipe(
      catchError(
        (err) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status == 403) {
              // window.location.href = '/logout';
              // console.log('errror 403')
              console.log(err, '403');
              this.logout();
              this.document.location.href = `${this._settingsService.settings.microServices.userManagement}/login`;
              // this.alertService.error(err.message, this.options);
            } else if (err.status == 0) {
              console.log(err, 'status 0 error');
              // this.reportsAlertService.error(err.message, this.options);
              // this.alertService2.error(err.message, this.options);
              // this.logout();
              // this.router.navigate(['/login']);
              // this.reportsAlertService.error(err.message, this.options);
              // this.alertService2.error(err.message, this.options);
              // this.alertService.error(err.message, this.options);
            } else if (err.status === 500) {
              if (Array.isArray(err.error)) {
                console.log('error occur here', err);
                const errMessage = err.error[err.error.length - 1];
                console.log(errMessage['message']);
                // this._toastrService.error(errMessage['message']);
              } else if (err.error.message.startsWith('No property sourceNodeAddress found for type Equipment!')) {
                console.log('error normal');
              }

              // this.reportsAlertService.error(this.translate.instant(`ERROR_CODE.${errMessage['as-code']}`), this.options);
              // this.alertService.error(this.translate.instant(`ERROR_CODE.${errMessage['as-code']}`), this.options);
              // this.alertService2.error(this.translate.instant(`ERROR_CODE.${errMessage['as-code']}`), this.options);
            } else if (err.message == undefined) {
              console.log('udenfidend');
              // this.alertService.error(this.translate.instant('ALERTS.ERROR'), this.options);
            } else if (err.message == null && err.message == '') {
              console.log('null');
              // this.alertService.error(this.translate.instant('ALERTS.ERROR'), this.options);
            } else if (err.message.startsWith('The Token has expired')) {
              this.document.location.href = `${this._settingsService.settings.microServices.userManagement}login`;
            } else if (err) {
              // this.reportsAlertService.error(this.translate.instant('ALERTS.ERROR'), this.options);
              // this.alertService.error(this.translate.instant('ALERTS.ERROR'), this.options);
              // this.alertService2.error(this.translate.instant('ALERTS.ERROR'), this.options);
            }

            return throwError({ err });
          }
        },
      ),
    );
  }

  public logout(): void {
    this._cookieService.delete(ECookieKeys.User);
    this._cookieService.delete(ECookieKeys.Name);
    this._cookieService.delete(ECookieKeys.Token);
  }

  private addAuthenticationToken(request: HttpRequest<any>): HttpRequest<any> {
    // console.log('token added');
    const token = this._cookieService.get<string>(ECookieKeys.Token);
    if (!token) {
      return request;
    }

    return request.clone({
      headers: request.headers.set(this.AUTH_HEADER, token),
    });
  }
}
