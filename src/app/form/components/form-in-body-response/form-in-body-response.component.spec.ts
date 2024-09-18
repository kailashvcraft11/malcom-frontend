import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormInBodyResponseComponent } from './form-in-body-response.component';

describe('FormInBodyResponseComponent', () => {
  let component: FormInBodyResponseComponent;
  let fixture: ComponentFixture<FormInBodyResponseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormInBodyResponseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormInBodyResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
