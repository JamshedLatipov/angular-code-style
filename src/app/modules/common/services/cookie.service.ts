import { Injectable, Inject, PLATFORM_ID, InjectionToken } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class CookieService {
  private _documentIsAccessible: boolean;

  constructor(
    @Inject(DOCUMENT) private _document: any,
    @Inject(PLATFORM_ID) private _platformId: InjectionToken<object>,
  ) {
    this._documentIsAccessible = isPlatformBrowser(this._platformId);
  }

  public check(name: string): boolean {
    if (!this._documentIsAccessible) {
      return false;
    }

    name = encodeURIComponent(name);

    const regExp: RegExp = this._getCookieRegExp(name);
    const exists: boolean = regExp.test(this._document.cookie);

    return exists;
  }

  public get<T>(name: string): T {
    if (this._documentIsAccessible && this.check(name)) {
      name = encodeURIComponent(name);

      const regExp: RegExp = this._getCookieRegExp(name);
      const result: RegExpExecArray = regExp.exec(this._document.cookie);

      const data = this._safeDecodeURIComponent(result[1]);
      try {
        return JSON.parse(data);
      } catch (e) {
        return data as any;
      }
    } else {
      return null;
    }
  }

  public getAll(): { [key: string]: string } {
    if (!this._documentIsAccessible) {
      return {};
    }

    const cookies: { [key: string]: string } = {};
    const document: any = this._document;

    if (document.cookie && document.cookie !== '') {
      document.cookie.split(';').forEach((currentCookie) => {
        const [cookieName, cookieValue] = currentCookie.split('=');
        cookies[
          this._safeDecodeURIComponent(cookieName.replace(/^ /, ''))
        ] = this._safeDecodeURIComponent(cookieValue);
      });
    }

    return cookies;
  }

  public set(
    name: string,
    value: any,
    expiresOrOptions?: number | Date | any,
    path?: string,
    domain?: string,
    secure?: boolean,
    sameSite?: 'Lax' | 'None' | 'Strict',
  ): void {
    if (typeof value !== 'string') {
      value = JSON.stringify(value).replace(/(%2E)/gi, '%20');
    }

    if (!this._documentIsAccessible) {
      return;
    }

    if (
      typeof expiresOrOptions === 'number' ||
      expiresOrOptions instanceof Date ||
      path ||
      domain ||
      secure ||
      sameSite
    ) {
      const optionsBody = {
        expires: expiresOrOptions,
        path,
        domain,
        secure,
        sameSite: sameSite ? sameSite : 'Lax',
      };

      this.set(name, value, optionsBody);
      return;
    }

    let cookieString: string =
      encodeURIComponent(name) + '=' + encodeURIComponent(value) + ';';

    const options = expiresOrOptions ? expiresOrOptions : {};

    if (options.expires) {
      if (typeof options.expires === 'number') {
        const dateExpires: Date = new Date(
          new Date().getTime() + options.expires * 1000 * 60 * 60 * 24,
        );

        cookieString += 'expires=' + dateExpires.toUTCString() + ';';
      } else {
        cookieString += 'expires=' + options.expires.toUTCString() + ';';
      }
    }

    if (options.path) {
      cookieString += 'path=' + options.path + ';';
    }

    if (options.domain) {
      cookieString += 'domain=' + options.domain + ';';
    }

    if (options.secure === false && options.sameSite === 'None') {
      options.secure = true;
      console.warn(`secure has enabled`);
    }
    if (options.secure) {
      cookieString += 'secure;';
    }

    if (!options.sameSite) {
      options.sameSite = 'Lax';
    }

    cookieString += 'sameSite=' + options.sameSite + ';';

    this._document.cookie = cookieString;
  }

  public delete(
    name: string,
    path?: string,
    domain?: string,
    secure?: boolean,
    sameSite: 'Lax' | 'None' | 'Strict' = 'Lax',
  ): void {
    if (!this._documentIsAccessible) {
      return;
    }
    const expiresDate = new Date('Thu, 01 Jan 1970 00:00:01 GMT');
    this.set(name, '', {
      expires: expiresDate,
      path,
      domain,
      secure,
      sameSite,
    });
  }

  public deleteAll(
    path?: string,
    domain?: string,
    secure?: boolean,
    sameSite: 'Lax' | 'None' | 'Strict' = 'Lax',
  ): void {
    if (!this._documentIsAccessible) {
      return;
    }

    const cookies: any = this.getAll();

    for (const cookieName in cookies) {
      if (cookies.hasOwnProperty(cookieName)) {
        this.delete(cookieName, path, domain, secure, sameSite);
      }
    }
  }

  private _getCookieRegExp(name: string): RegExp {
    const escapedName: string = name.replace(
      /([\[\]\{\}\(\)\|\=\;\+\?\,\.\*\^\$])/gi,
      '\\$1',
    );

    return new RegExp(
      '(?:^' + escapedName + '|;\\s*' + escapedName + ')=(.*?)(?:;|$)',
      'g',
    );
  }

  private _safeDecodeURIComponent(encodedURIComponent: string): string {
    try {
      return decodeURIComponent(encodedURIComponent);
    } catch {
      return encodedURIComponent;
    }
  }

  private _safeEncodeURIComponent(decodeURIComponent: any): string {
    try {
      return encodeURIComponent(decodeURIComponent);
    } catch {
      return decodeURIComponent;
    }
  }
}
