import { TestBed } from '@angular/core/testing';
import { Injector } from '@angular/core';
import { HttpRequest } from '@angular/common/http';
import { HttpHandler } from '@angular/common/http';
import { ErrorInterceptor } from './error.interceptor';

describe('ErrorInterceptor', () => {
  let service: ErrorInterceptor;

  beforeEach(() => {
    const injectorStub = () => ({ get: modalService => ({}) });
    TestBed.configureTestingModule({
      providers: [
        ErrorInterceptor,
        { provide: Injector, useFactory: injectorStub }
      ]
    });
    service = TestBed.inject(ErrorInterceptor);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  describe('intercept', () => {
    it('makes expected calls', () => {
      const httpRequestStub: HttpRequest = <any>{};
      const httpHandlerStub: HttpHandler = <any>{};
      spyOn(httpHandlerStub, 'handle').and.callThrough();
      service.intercept(httpRequestStub, httpHandlerStub);
      expect(httpHandlerStub.handle).toHaveBeenCalled();
    });
  });
});
