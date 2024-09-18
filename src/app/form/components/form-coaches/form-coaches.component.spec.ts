import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCoachesComponent } from './form-coaches.component';

describe('FormCoachesComponent', () => {
  let component: FormCoachesComponent;
  let fixture: ComponentFixture<FormCoachesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormCoachesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormCoachesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
