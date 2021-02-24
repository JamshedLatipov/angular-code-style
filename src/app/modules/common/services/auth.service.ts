import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ECookieKeys } from '@alpha-smart/utils/enums/auth.enum';
import { SettingsService } from '@alpha-smart/common/lib/services/settings.service';
import { CookieService } from '@alpha-smart/common/lib/services/cookie.service';

import { map, mergeMap } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';

import { User, Role } from '../models';
import { UserWithRoles } from '@user-management/app/models/user-with-roles';

@Injectable()
export class AuthService {
  public user: Observable<User>;

  private userSubject: BehaviorSubject<User>;
  private _backendURL: string;

  constructor(
    private _http: HttpClient,
    private _settingsService: SettingsService,
    private _cookieService: CookieService,
  ) {
    this.userSubject = new BehaviorSubject<User>(
      this._cookieService.get(ECookieKeys.User),
    );
    this.user = this.userSubject.asObservable();
    this._backendURL = this._settingsService.settings.backendURL;
  }

  public isAuthorized(): boolean {
    return !!this.userValue;
  }

  public get userValue(): User {
    return this.userSubject.value;
  }

  public hasRole(role: Role): boolean {
    console.log(typeof this.userValue);
    return this.userValue && this.userValue.role.includes(role);
  }

  public login(login: string, password: string): Observable<any> {
    return this._http
      .post<User>(`${this._backendURL}/login`, { login, password })
      .pipe(mergeMap((res: User) => this._getRoles(res)));
  }

  public logout(): void {
    this._cookieService.deleteAll();
    this.userSubject.next(null);
  }

  public fetchRoles(): Observable<UserWithRoles> {
    return this._http.get<UserWithRoles>(`${this._backendURL}/who-am-i/`);
  }

  private _getRoles(res: User): Observable<User> {
    this.setSession(res);
    return this.fetchRoles()
      .pipe(map(({ data }) => {
        const roles = data.functions.map((f) => f.name);
        const userData = data.user;
        res['role'] = roles;
        res['user'] = userData;
        this._cookieService.set(ECookieKeys.User, res);
        this.userSubject.next(res);
        return res;
      }),
      );
  }

  private setSession(authResult: User): void {
    this._cookieService.set(ECookieKeys.Token, authResult.token);
    this._cookieService.set(ECookieKeys.Name, authResult.name);
  }

  // TODO: delete function argument logResult
  private deleteSession(logResult: any): void {
    this._cookieService.delete(ECookieKeys.Token);
    this._cookieService.delete(ECookieKeys.Name);
  }
}
