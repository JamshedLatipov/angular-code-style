import { TestBed } from '@angular/core/testing';
import { DomSanitizer } from '@angular/platform-browser';
import { SafeHtmlPipe } from './safe-html.pipe';

describe('SafeHtmlPipe', () => {
  let pipe: SafeHtmlPipe;

  beforeEach(() => {
    const domSanitizerStub = () => ({ bypassSecurityTrustHtml: value => ({}) });
    TestBed.configureTestingModule({
      providers: [
        SafeHtmlPipe,
        { provide: DomSanitizer, useFactory: domSanitizerStub }
      ]
    });
    pipe = TestBed.inject(SafeHtmlPipe);
  });

  it('can load instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('transforms X to Y', () => {
    const value: any = 'X';
    const args: string[] = [];
    expect(pipe.transform(value, args)).toEqual('Y');
  });
});
