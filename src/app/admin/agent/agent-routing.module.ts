import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllAgentComponent } from './all-agent/all-agent.component';
import { AddAgentComponent } from './add-agent/add-agent.component';
import { AboutAgentComponent } from './about-agent/about-agent.component';
import { ActiveAgentComponent } from './active-agent/active-agent.component';
import { BannedAgentsComponent } from './banned-agents/banned-agents.component';
import { EmailAgentUnverifiedComponent } from './email-agent-unverified/email-agent-unverified.component';
import { MobileAgentUnverifiedComponent } from './mobile-agent-unverified/mobile-agent-unverified.component';

const routes: Routes = [
  {
    path: 'all-agent',
    component: AllAgentComponent
  },
  {
    path: 'add-agent',
    component: AddAgentComponent
  },
  {
    path: 'about-agent/:id',
    component: AboutAgentComponent
  },
  {
    path: 'active-agent',
    component: ActiveAgentComponent
  },
  {
    path: 'banned-agent',
    component: BannedAgentsComponent
  },
  {
    path: 'email-agent-unverified',
    component: EmailAgentUnverifiedComponent
  },
  {
    path: 'mobile-agent-unverified',
    component: MobileAgentUnverifiedComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgentRoutingModule {}

