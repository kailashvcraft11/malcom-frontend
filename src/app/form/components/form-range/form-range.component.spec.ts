import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormRangeComponent } from './form-range.component';

describe('FormRangeComponent', () => {
  let component: FormRangeComponent;
  let fixture: ComponentFixture<FormRangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormRangeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormRangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
