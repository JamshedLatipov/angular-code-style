import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ElementRef } from '@angular/core';
import { InputFocusDirective } from './focus.directive';

@Component({
  template: `
    <div>Without Directive</div>
    <div nput[alphaSmartInputFocus>Default</div>
  `
})
class TestComponent {}

describe('InputFocusDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let elementsWithDirective: Array<DebugElement>;
  let bareElement: DebugElement;

  beforeEach(() => {
    const elementRefStub = () => ({ nativeElement: { focus: () => ({}) } });
    TestBed.configureTestingModule({
      declarations: [InputFocusDirective, TestComponent]
    });
    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
    elementsWithDirective = fixture.debugElement.queryAll(
      By.directive(InputFocusDirective)
    );
    bareElement = fixture.debugElement.query(
      By.css(':not(input[alphaSmartInputFocus])')
    );
  });

  it('should have bare element', () => {
    expect(bareElement).toBeTruthy();
  });

  it('should have 1 element(s) with directive', () => {
    expect(elementsWithDirective.length).toBe(1);
  });
});
