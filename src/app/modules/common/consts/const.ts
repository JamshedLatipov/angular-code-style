import { InjectionToken } from '@angular/core';

import { ISettingsConfigs } from '../interfaces/default-settings.interface';

export const DEFAULT_SETTINGS = new InjectionToken<ISettingsConfigs>(
    'settings',
);