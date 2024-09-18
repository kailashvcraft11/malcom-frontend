import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormInBodyLoginComponent } from './form-in-body-login.component';

describe('FormInBodyLoginComponent', () => {
  let component: FormInBodyLoginComponent;
  let fixture: ComponentFixture<FormInBodyLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormInBodyLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormInBodyLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
