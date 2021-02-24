import { Injectable } from '@angular/core';

import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { ECookieKeys } from '@alpha-smart/utils/enums/auth.enum';

import { CookieService } from './cookie.service';

const DEFAULT_LANGUAGE: string = 'ru';
const SYSTEM_LANGUAGE: string = navigator.languages
  ? navigator.languages[0]
  : (navigator.language);


@Injectable()
export class ConfigurationService {
  public set lang(lang: string) {
    this._translateService.setDefaultLang(lang);
    this._translateService.use(lang);
  }

  public get lang(): string {
    return this._translateService.currentLang;
  }

  constructor(
    private _translateService: TranslateService,
    private _cookieService: CookieService,
  ) {
    this._init();
  }

  private _init(): void {
    this._initLang();
  }

  private _initLang(): void {
    const locale: string = this._cookieService.get<string>(ECookieKeys.Locale);

    if (locale !== null) {
      this.lang = locale;
    } else {
      if (SYSTEM_LANGUAGE.includes('en-')) {
        this.lang = 'en';
      } else {
        this.lang = DEFAULT_LANGUAGE;
      }
    }

    // Init lang change listener
    this._translateService.onLangChange.subscribe(
      (languageEvent: LangChangeEvent) => {
        this._cookieService.set(ECookieKeys.Locale, languageEvent.lang);
      },
    );
  }
}
