import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannedStaffComponent } from './banned-staff.component';

describe('BannedStaffComponent', () => {
  let component: BannedStaffComponent;
  let fixture: ComponentFixture<BannedStaffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BannedStaffComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BannedStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
