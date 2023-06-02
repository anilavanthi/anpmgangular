import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {BehaviorSubject,Observable, firstValueFrom } from 'rxjs';
import { AgentService } from '../all-agent/agent.service';
import { Agent,AgentResponse,SingleAgentResponse,User } from '../all-agent/agent.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-about-agent',
  templateUrl: './about-agent.component.html',
  styleUrls: ['./about-agent.component.scss'],
  providers :[AgentService]
})
export class AboutAgentComponent {
  breadscrums = [
    {
      title: 'Profile',
      items: ['Agent'],
      active: 'Profile',
    },
  ];
  public agent$: BehaviorSubject<Agent[]> = new BehaviorSubject<Agent[]>([]);
  public agent!: Agent |null | undefined ;
  public data:Agent[] = [];
  // public staff$: Observable<Staff[]>;
  constructor(
    private route: ActivatedRoute,
    private agentService : AgentService,
  ) {
    // constructor;
  }

  ngOnInit() {
    const agentId = this.route.snapshot.paramMap.get('id');
    const id: number = Number(agentId);
    this.agentService.getAgentData(id).subscribe((response)=>{
      this.agent = response.data;
    })
    
  }
  
}
