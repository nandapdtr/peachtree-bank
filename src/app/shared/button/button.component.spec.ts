import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonComponent } from './button.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;
  let debugElement: DebugElement;

  function getDebugElement(selector: string): DebugElement {
    return debugElement.query(By.css(selector));
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ButtonComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should create default button of type 'button' on detectChanges()`, () => {
    const buttonEl = getDebugElement('button').nativeElement;
    expect(buttonEl.type).toBe('button');
  });

  it('should add btn-primary as default class to button', () => {
    const buttonEl = getDebugElement('button').nativeElement;
    expect(buttonEl).toHaveClass('btn-primary');
  });

  it('should add given input category as class to button', () => {
    component.category = 'btn-secondary';

    fixture.detectChanges();

    const buttonEl = getDebugElement('button').nativeElement;
    expect(buttonEl).toHaveClass('btn-secondary');
  });

  it('should create button of type submit', () => {
    component.type = 'submit';

    fixture.detectChanges();

    const buttonEl = getDebugElement('button').nativeElement;
    expect(buttonEl.type).toBe('submit');
  });

  it('should disable the button', () => {
    let buttonEl = getDebugElement('button').nativeElement;

    expect(buttonEl.disabled).toBeFalse();

    component.disabled = true;

    fixture.detectChanges();

    buttonEl = getDebugElement('button').nativeElement;
    expect(buttonEl.disabled).toBeTrue();
  });

  it('should emit an event on click', () => {
    spyOn(component.clicked, 'emit');

    const buttonEl = getDebugElement('button').nativeElement;
    buttonEl.click();

    expect(component.clicked.emit).toHaveBeenCalled();
  });
});
