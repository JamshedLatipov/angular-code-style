import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

import { delay, retry } from 'rxjs/operators';

import { DEFAULT_SETTINGS } from '../consts/const';
import { ISettingsConfigs } from '../interfaces/default-settings.interface';

export interface ISettings {
  backendURL?: string;
  production?: false;
  sentryDSN?: string;
  sentryAllowedHosts?: string[];
  userManagementURL?: string;
  positioningURL?: string;
  reportingURL?: string;
  microServices: {
    admin: string;
    map: string;
    userManagement: string;
  };
}

// HTTP
const RETRY_COUNT: number = 3;
const RETRY_DELAY: number = 1000;

@Injectable()
export class SettingsService {
  private readonly BASE_URL: string = `/${
    this._defaultSettings.isProduction ? 'settings' : 'assets'
  }/`;
  private readonly FILE_NAME: string = `settings`;
  private readonly FILE_EXT: string = 'json';

  private _settings: ISettings;

  public get settings(): ISettings {
    return this._settings;
  }

  constructor(
    @Inject(DEFAULT_SETTINGS)
    private _defaultSettings: ISettingsConfigs,
    private _http: HttpClient,
  ) {}

  public load(): Promise<any> {
    console.log('start loading settings');
    return new Promise((resolve, reject) => {
      this._http
        .get<ISettings>(
          `${this.BASE_URL}${this.FILE_NAME}.${
            this.FILE_EXT
          }?timestamp=${new Date().getTime()}`,
        )
        .pipe(delay(RETRY_DELAY), retry(RETRY_COUNT))
        .subscribe(
          (response: any) => {
            this._settings = response;
            resolve(true);
          },
          (err) => reject(err),
        );
    });
  }
}
