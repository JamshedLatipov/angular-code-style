import {Directive, ElementRef, HostBinding, HostListener} from '@angular/core';

@Directive({
  selector: '[mapDrawHide]',
  exportAs: 'mlDrawHide',
})
export class HideDirective {
  constructor(private Element: ElementRef) {}

  @HostBinding('class.show') isOpen: boolean = false;

  @HostListener('document:click', ['$event'])
  public toggle(event: any): void {
    if (this.Element.nativeElement.contains(event.target)) {
      this.isOpen = !this.isOpen;
    } else {
      this.isOpen = false;
    }
  }
}
