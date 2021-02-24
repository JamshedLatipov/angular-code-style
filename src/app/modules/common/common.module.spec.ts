import { TestBed } from '@angular/core/testing';
import { ISettingsConfigs } from './interfaces/default-settings.interface';
import { AlphaSafetyCommonModule } from './common.module';

describe('AlphaSafetyCommonModule', () => {
  let pipe: AlphaSafetyCommonModule;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [AlphaSafetyCommonModule] });
    pipe = TestBed.inject(AlphaSafetyCommonModule);
  });

  it('can load instance', () => {
    expect(pipe).toBeTruthy();
  });
});
