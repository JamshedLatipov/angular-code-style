import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ElementRef } from '@angular/core';
import { NgZone } from '@angular/core';
import { ResizableDirective } from './resizeable.directive';

@Component({
  template: `
    <div>Without Directive</div>
    <div alphaSmartResizable>Default</div>
  `
})
class TestComponent {}

describe('ResizableDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let elementsWithDirective: Array<DebugElement>;
  let bareElement: DebugElement;

  beforeEach(() => {
    const elementRefStub = () => ({
      nativeElement: {
        addEventListener: () => ({}),
        removeEventListener: () => ({}),
        style: {},
        clientWidth: {},
        offsetLeft: {}
      }
    });
    const ngZoneStub = () => ({ runOutsideAngular: function0 => ({}) });
    TestBed.configureTestingModule({
      declarations: [ResizableDirective, TestComponent]
    });
    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
    elementsWithDirective = fixture.debugElement.queryAll(
      By.directive(ResizableDirective)
    );
    bareElement = fixture.debugElement.query(
      By.css(':not([alphaSmartResizable])')
    );
  });

  it('should have bare element', () => {
    expect(bareElement).toBeTruthy();
  });

  it('should have 1 element(s) with directive', () => {
    expect(elementsWithDirective.length).toBe(1);
  });
});
