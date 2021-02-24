import { AfterViewInit, Directive, ElementRef, Input } from '@angular/core';

import { timeout } from '@alpha-smart/utils/timeout.util';

@Directive({
  selector: 'input[alphaSmartInputFocus]',
})
export class InputFocusDirective implements AfterViewInit {

  // tslint:disable-next-line: no-input-rename
  @Input('alphaSmartInputFocus')
  private _isFocused: boolean = false;

  constructor(public element: ElementRef<HTMLElement>) { }

  ngAfterViewInit(): void {
    if (this._isFocused) {
      timeout().subscribe(() => this.element.nativeElement.focus());
    }
  }
}
