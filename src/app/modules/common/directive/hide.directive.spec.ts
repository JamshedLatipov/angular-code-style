import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ElementRef } from '@angular/core';
import { HideDirective } from './hide.directive';

@Component({
  template: `
    <div>Without Directive</div>
    <div mapDrawHide>Default</div>
  `
})
class TestComponent {}

describe('HideDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let elementsWithDirective: Array<DebugElement>;
  let bareElement: DebugElement;

  beforeEach(() => {
    const elementRefStub = () => ({ nativeElement: { contains: () => ({}) } });
    TestBed.configureTestingModule({
      declarations: [HideDirective, TestComponent]
    });
    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
    elementsWithDirective = fixture.debugElement.queryAll(
      By.directive(HideDirective)
    );
    bareElement = fixture.debugElement.query(By.css(':not([mapDrawHide])'));
  });

  it('should have bare element', () => {
    expect(bareElement).toBeTruthy();
  });

  it('should have 1 element(s) with directive', () => {
    expect(elementsWithDirective.length).toBe(1);
  });
});
