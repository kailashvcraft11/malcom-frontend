import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSortableComponent } from './form-sortable.component';

describe('FormSortableComponent', () => {
  let component: FormSortableComponent;
  let fixture: ComponentFixture<FormSortableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormSortableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormSortableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
