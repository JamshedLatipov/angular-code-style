import { TestBed } from '@angular/core/testing';
import { SafeHtmlModule } from './safe-html.module';

describe('SafeHtmlModule', () => {
  let pipe: SafeHtmlModule;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [SafeHtmlModule] });
    pipe = TestBed.inject(SafeHtmlModule);
  });

  it('can load instance', () => {
    expect(pipe).toBeTruthy();
  });
});
