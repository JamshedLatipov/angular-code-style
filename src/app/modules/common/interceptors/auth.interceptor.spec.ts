import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { HttpRequest } from '@angular/common/http';
import { HttpHandler } from '@angular/common/http';
import { CookieService } from '../services/cookie.service';
import { SettingsService } from '../services/settings.service';
import { AuthInterceptor } from './auth.interceptor';

describe('AuthInterceptor', () => {
  let service: AuthInterceptor;

  beforeEach(() => {
    const routerStub = () => ({});
    const cookieServiceStub = () => ({
      delete: user => ({}),
      get: token => ({})
    });
    const settingsServiceStub = () => ({
      settings: { microServices: { userManagement: {} } }
    });
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthInterceptor,
        { provide: Router, useFactory: routerStub },
        { provide: CookieService, useFactory: cookieServiceStub },
        { provide: SettingsService, useFactory: settingsServiceStub }
      ]
    });
    service = TestBed.inject(AuthInterceptor);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  describe('intercept', () => {
    it('makes expected calls', () => {
      const httpRequestStub: HttpRequest = <any>{};
      const httpHandlerStub: HttpHandler = <any>{};
      spyOn(component, 'logout').and.callThrough();
      spyOn(httpRequestStub, 'clone').and.callThrough();
      spyOn(httpHandlerStub, 'handle').and.callThrough();
      service.intercept(httpRequestStub, httpHandlerStub);
      expect(service.logout).toHaveBeenCalled();
      expect(httpRequestStub.clone).toHaveBeenCalled();
      expect(httpHandlerStub.handle).toHaveBeenCalled();
    });
  });

  describe('logout', () => {
    it('makes expected calls', () => {
      const cookieServiceStub: CookieService = TestBed.inject(CookieService);
      spyOn(cookieServiceStub, 'delete').and.callThrough();
      service.logout();
      expect(cookieServiceStub.delete).toHaveBeenCalled();
    });
  });
});
