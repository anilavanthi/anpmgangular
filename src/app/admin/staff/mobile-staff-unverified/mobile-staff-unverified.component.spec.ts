import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileStaffUnverifiedComponent } from './mobile-staff-unverified.component';

describe('MobileStaffUnverifiedComponent', () => {
  let component: MobileStaffUnverifiedComponent;
  let fixture: ComponentFixture<MobileStaffUnverifiedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MobileStaffUnverifiedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MobileStaffUnverifiedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
