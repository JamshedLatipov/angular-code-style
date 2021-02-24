import { TestBed } from '@angular/core/testing';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from './cookie.service';
import { ConfigurationService } from './configuration.service';

describe('ConfigurationService', () => {
  let service: ConfigurationService;

  beforeEach(() => {
    const translateServiceStub = () => ({
      onLangChange: { subscribe: f => f({}) }
    });
    const cookieServiceStub = () => ({
      get: locale => ({}),
      set: (locale, lang) => ({})
    });
    TestBed.configureTestingModule({
      providers: [
        ConfigurationService,
        { provide: TranslateService, useFactory: translateServiceStub },
        { provide: CookieService, useFactory: cookieServiceStub }
      ]
    });
    service = TestBed.inject(ConfigurationService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });
});
