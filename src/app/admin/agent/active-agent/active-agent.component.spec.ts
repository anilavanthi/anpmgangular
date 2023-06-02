import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveAgentComponent } from './active-agent.component';

describe('ActiveAgentComponent', () => {
  let component: ActiveAgentComponent;
  let fixture: ComponentFixture<ActiveAgentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActiveAgentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActiveAgentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
