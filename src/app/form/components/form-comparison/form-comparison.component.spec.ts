import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormComparisonComponent } from './form-comparison.component';

describe('FormComparisonComponent', () => {
  let component: FormComparisonComponent;
  let fixture: ComponentFixture<FormComparisonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormComparisonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormComparisonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
