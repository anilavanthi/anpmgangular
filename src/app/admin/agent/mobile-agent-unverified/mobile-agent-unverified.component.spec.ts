import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileAgentUnverifiedComponent } from './mobile-agent-unverified.component';

describe('MobileAgentUnverifiedComponent', () => {
  let component: MobileAgentUnverifiedComponent;
  let fixture: ComponentFixture<MobileAgentUnverifiedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MobileAgentUnverifiedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MobileAgentUnverifiedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
