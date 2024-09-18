import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormInsightsComponent } from './form-insights.component';

describe('FormInsightsComponent', () => {
  let component: FormInsightsComponent;
  let fixture: ComponentFixture<FormInsightsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormInsightsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormInsightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
