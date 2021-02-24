import {
  NgModule,
  ModuleWithProviders,
  SkipSelf,
  Optional,
  APP_INITIALIZER,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { DialogModule } from '@alpha-smart/ui/lib/modules/dialog/dialog.module';

import { SettingsService } from './services/settings.service';
import { DomService } from './services/dom.service';
import { CookieService } from './services/cookie.service';
import { ISettingsConfigs } from './interfaces/default-settings.interface';
import { DEFAULT_SETTINGS } from './consts/const';
import { ConfigurationService } from './services/configuration.service';
import { AuthService } from './services/auth.service';
import { ErrorRequestModule } from './modules/error-request/error-request.module';
import { ResizableDirective } from './directive/resizeable.directive';

export function initApp(settingsService: SettingsService): any {
  return () => settingsService.load();
}

@NgModule({
  declarations: [ResizableDirective],
  imports: [
    CommonModule,
    ErrorRequestModule,
    HttpClientModule,
    DialogModule,
    TranslateModule.forRoot({
      defaultLanguage: 'ru',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
      isolate: false,
      useDefaultLang: false,
    }),
  ],
  providers: [
    SettingsService,
    DomService,
    {
      provide: APP_INITIALIZER,
      useFactory: initApp,
      deps: [SettingsService],
      multi: true,
    },
  ],
  exports: [TranslateModule, ResizableDirective],
})
export class AlphaSafetyCommonModule {
  constructor(@Optional() @SkipSelf() parentModule: AlphaSafetyCommonModule) {
    if (parentModule) {
      throw new Error(
        'AlphaSafetyCommonModule is already loaded. Please add it in AppModule only.',
      );
    }
  }

  public static forRoot(
    settings: ISettingsConfigs,
  ): ModuleWithProviders<AlphaSafetyCommonModule> {
    return {
      ngModule: AlphaSafetyCommonModule,
      providers: [
        DomService,
        SettingsService,
        CookieService,
        ConfigurationService,
        AuthService,
        { provide: DEFAULT_SETTINGS, useValue: settings },
      ],
    };
  }
}

export function HttpLoaderFactory(http: HttpClient): TranslateLoader {
  return new TranslateHttpLoader(http, 'assets/locale/', '.json');
}
