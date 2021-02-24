import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { RoleDirective } from '@alpha-smart/common/lib/modules/roles/role.directive';
import { Role } from 'libs/shared/enums/role';
import { CookieService } from '@alpha-smart/common/lib/services/cookie.service';
import { By } from '@angular/platform-browser';

@Component({
  template: `
    <div>Without Directive</div>
    <div *hasAccess="[${Role.Admin}]" class="default">Default</div>
  `
})
class TestFalseComponent {}

@Component({
  template: `
    <div>Without Directive</div>
    <div *hasAccess="[${Role.MapAdmin}]" class="default">Default</div>
  `
})
class TestTrueComponent {}

describe('RoleDirective', () => {
  let trueFixture: ComponentFixture<TestTrueComponent>;
  let trueComponent: TestTrueComponent;
  let falseFixture: ComponentFixture<TestFalseComponent>;
  let falseComponent: TestFalseComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        RoleDirective,
        TestTrueComponent
      ],
      providers: [
        {
          provide: CookieService,
          useValue: {
            get: (role: string) => {
              return {
                role: [
                  Role.MapAdmin
                ]
              }
            }
          }
        }
      ]
    });
    trueFixture = TestBed.createComponent(TestTrueComponent);
    trueComponent = trueFixture.componentInstance;
    trueFixture.detectChanges();

    falseFixture = TestBed.createComponent(TestFalseComponent);
    falseComponent = falseFixture.componentInstance;
    falseFixture.detectChanges();
  });

  it('should create', () => {
    expect(trueFixture.debugElement.query(By.css('.default'))).toBeTruthy();
  });

  it('should not create', () => {
    expect(falseFixture.debugElement.query(By.css('.default'))).toBeTruthy();
  })
});
