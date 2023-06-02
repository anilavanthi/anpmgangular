import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailAgentUnverifiedComponent } from './email-agent-unverified.component';

describe('EmailAgentUnverifiedComponent', () => {
  let component: EmailAgentUnverifiedComponent;
  let fixture: ComponentFixture<EmailAgentUnverifiedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmailAgentUnverifiedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmailAgentUnverifiedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
