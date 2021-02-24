import {
  Directive,
  ElementRef,
  OnInit,
  Input,
  NgZone,
  OnDestroy,
} from '@angular/core';

@Directive({
  selector: '[alphaSmartResizable]',
})
export class ResizableDirective implements OnInit, OnDestroy {
  @Input() resizableGrabWidth: number = 8;
  @Input() resizableMinWidth: number = 10;

  public dragging: boolean = false;

  private _preventGlobalMouseEvents = (): void => {
    document.body.style['pointer-events'] = 'none';
  };

  private _restoreGlobalMouseEvents = (): void => {
    document.body.style['pointer-events'] = 'auto';
  };

  private _newWidth = (wid: number): void => {
    const newWidth = Math.max(this.resizableMinWidth, wid);
    this.el.nativeElement.style.width = newWidth + 'px';
  };

  private _mouseMoveG = (evt: any): void => {
    if (!this.dragging) {
      return;
    }
    this._newWidth(evt.clientX - this.el.nativeElement.offsetLeft);
    evt.stopPropagation();
  };

  private _dragMoveG = (evt: any): void => {
    if (!this.dragging) {
      return;
    }
    const newWidth =
      Math.max(
        this.resizableMinWidth,
        evt.clientX - this.el.nativeElement.offsetLeft,
      ) + 'px';
    this.el.nativeElement.style.width =
      evt.clientX - this.el.nativeElement.offsetLeft + 'px';
    evt.stopPropagation();
  };

  private _mouseUpG = (evt: any): void => {
    if (!this.dragging) {
      return;
    }
    this._restoreGlobalMouseEvents();
    this.dragging = false;
    evt.stopPropagation();
  };

  private _mouseDown = (evt: any): void => {
    if (this.inDragRegion(evt)) {
      this.dragging = true;
      this._preventGlobalMouseEvents();
      evt.stopPropagation();
    }
  };

  private _mouseMove = (evt: any): void => {
    if (this.inDragRegion(evt) || this.dragging) {
      this.el.nativeElement.style.cursor = 'col-resize';
    } else {
      this.el.nativeElement.style.cursor = 'default';
    }
  };

  constructor(private el: ElementRef, private _zone: NgZone) {
    this._zone.runOutsideAngular(() => {
      document.addEventListener('mousemove', this._mouseMoveG, true);
      document.addEventListener('mouseup', this._mouseUpG, true);
      el.nativeElement.addEventListener('mousedown', this._mouseDown, true);
      el.nativeElement.addEventListener('mousemove', this._mouseMove, true);
    });
  }

  ngOnDestroy(): void {
    document.removeEventListener('mousemove', this._mouseMoveG, true);
    document.removeEventListener('mouseup', this._mouseUpG, true);
    this.el.nativeElement.removeEventListener(
      'mousedown',
      this._mouseDown,
      true,
    );
    this.el.nativeElement.removeEventListener(
      'mousemove',
      this._mouseMove,
      true,
    );
  }

  ngOnInit(): void {
    this.el.nativeElement.style['border-right'] =
      this.resizableGrabWidth + 'px solid darkgrey';
  }

  inDragRegion(evt) {
    return (
      this.el.nativeElement.clientWidth -
        evt.clientX +
        this.el.nativeElement.offsetLeft <
      this.resizableGrabWidth
    );
  }
}
