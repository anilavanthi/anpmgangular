import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutAgentComponent } from './about-agent.component';

describe('AboutAgentComponent', () => {
  let component: AboutAgentComponent;
  let fixture: ComponentFixture<AboutAgentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutAgentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutAgentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
