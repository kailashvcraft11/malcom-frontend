import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormGraphComponent } from './form-graph.component';

describe('FormGraphComponent', () => {
  let component: FormGraphComponent;
  let fixture: ComponentFixture<FormGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
