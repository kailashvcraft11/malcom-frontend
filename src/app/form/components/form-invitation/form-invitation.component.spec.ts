import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormInvitationComponent } from './form-invitation.component';

describe('FormInvitationComponent', () => {
  let component: FormInvitationComponent;
  let fixture: ComponentFixture<FormInvitationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormInvitationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormInvitationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
