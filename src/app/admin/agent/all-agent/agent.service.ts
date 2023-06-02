import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Agent,AgentResponse,User,SingleAgentResponse } from './agent.model';
import { HttpClient, HttpErrorResponse,HttpHeaders  } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import {environment} from 'src/environments/environment';

@Injectable()
export class AgentService extends UnsubscribeOnDestroyAdapter {
    private readonly API_URL = 'assets/data/agent.json';
  isTblLoading = true;
  dataChange: BehaviorSubject<Agent[]> = new BehaviorSubject<Agent[]>([]);
  public staff$: BehaviorSubject<Agent[]> = new BehaviorSubject<Agent[]>([]);
  // Temporarily stores data from dialogs
  dialogData!: Agent;
  constructor(private httpClient: HttpClient) {
    super();
  }
  get data(): Agent[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }

  
  /** CRUD METHODS */
  getAgent(): void {
    this.subs.sink = this.httpClient.get<AgentResponse>(environment.apiUrl+"/masters/agent/")
      .subscribe({
      next: (data) => {
        this.isTblLoading = false;
        this.dataChange.next(data.data);
      },
      error: (error: HttpErrorResponse) => {
        this.isTblLoading = false;
        console.log(error.name + ' ' + error.message);
      },
    });
  }


  getAgentData(id:number):Observable<SingleAgentResponse> {
    return this.httpClient.get<SingleAgentResponse>(environment.apiUrl+"/masters/agent/"  + id)
   }


  addAgent(agent: Agent,photo:File): void {
    this.dialogData = agent;
    const formData: FormData = new FormData();
    const jsonAgent = JSON.stringify(agent);
    formData.append('photo', photo);
    formData.append('data', jsonAgent);
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    this.httpClient.post(environment.apiUrl+"/masters/agent/", formData,{headers})
      .subscribe({
        next: (data) => {
         this.dialogData = agent;
        //this.dialogData = formData.get('data');
        },
        error: (error: HttpErrorResponse) => {
          console.log(error);
        },
      });
  }

 
  deleteAgent(id: number): void {
    this.httpClient.delete(environment.apiUrl+"/masters/agent/" + id)
      .subscribe({
        next: (data) => {
          console.log(id);
        },
        error: (error: HttpErrorResponse) => {
          console.log(error);
        },
      });
  }

}
