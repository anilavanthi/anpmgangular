import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailStaffUnverifiedComponent } from './email-staff-unverified.component';

describe('EmailStaffUnverifiedComponent', () => {
  let component: EmailStaffUnverifiedComponent;
  let fixture: ComponentFixture<EmailStaffUnverifiedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmailStaffUnverifiedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmailStaffUnverifiedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
