import { TestBed } from '@angular/core/testing';
import { InjectionToken } from '@angular/core';
import { CookieService } from './cookie.service';

describe('CookieService', () => {
  let service: CookieService;

  beforeEach(() => {
    const injectionTokenStub = () => ({});
    TestBed.configureTestingModule({
      providers: [
        CookieService,
        { provide: InjectionToken, useFactory: injectionTokenStub }
      ]
    });
    service = TestBed.inject(CookieService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });
});
