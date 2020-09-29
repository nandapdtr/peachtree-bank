import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { DebugElement, Component } from '@angular/core';
import { By } from '@angular/platform-browser';

@Component({
  selector: 'app-header',
  template: ''
})
class HeaderMockComponent { }

@Component({
  selector: 'app-dashboard',
  template: ''
})
class DashboardMockComponent { }

describe('AppComponent', () => {
  let app: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let debugElement: DebugElement;

  function getDebugElement(selector: string): DebugElement {
    return debugElement.query(By.css(selector));
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        HeaderMockComponent,
        DashboardMockComponent
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it(`should have as title 'peachtree-bank'`, () => {
    expect(app.title).toEqual('peachtree-bank');
  });

  it('should display header component', () => {
    const headerDe = getDebugElement('app-header');

    expect(headerDe).toBeTruthy();
  });

  it('should display dashboard component', () => {
    const dashboardDe = getDebugElement('app-dashboard');

    expect(dashboardDe).toBeTruthy();
  });
});
