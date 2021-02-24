import { TestBed } from '@angular/core/testing';
import { ErrorRequestModule } from './error-request.module';

describe('ErrorRequestModule', () => {
  let pipe: ErrorRequestModule;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [ErrorRequestModule] });
    pipe = TestBed.inject(ErrorRequestModule);
  });

  it('can load instance', () => {
    expect(pipe).toBeTruthy();
  });
});
