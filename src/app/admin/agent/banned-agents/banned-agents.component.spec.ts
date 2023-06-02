import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannedAgentsComponent } from './banned-agents.component';

describe('BannedAgentsComponent', () => {
  let component: BannedAgentsComponent;
  let fixture: ComponentFixture<BannedAgentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BannedAgentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BannedAgentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
