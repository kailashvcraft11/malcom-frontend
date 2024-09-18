import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormInBodyResultsComponent } from './form-in-body-results.component';

describe('FormInBodyResultsComponent', () => {
  let component: FormInBodyResultsComponent;
  let fixture: ComponentFixture<FormInBodyResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormInBodyResultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormInBodyResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
