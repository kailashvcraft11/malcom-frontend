import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormBreakComponent } from './form-break.component';

describe('FormBreakComponent', () => {
  let component: FormBreakComponent;
  let fixture: ComponentFixture<FormBreakComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormBreakComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormBreakComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
