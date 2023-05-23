import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MemberShip,MemberShipResponse } from './membership.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import {environment} from 'src/environments/environment';

@Injectable()
export class MemberShipService extends UnsubscribeOnDestroyAdapter {
  isTblLoading = true;
  dataChange: BehaviorSubject<MemberShip[]> = new BehaviorSubject<MemberShip[]>(
    []
  );
  public memberships$: BehaviorSubject<MemberShip[]> = new BehaviorSubject<MemberShip[]>([]);
  // Temporarily stores data from dialogs
  dialogData!: MemberShip;
  constructor(private httpClient: HttpClient) {
    super();
  }
  get data(): MemberShip[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getMemberShip(): void {
    this.subs.sink = this.httpClient.get<MemberShipResponse>(environment.apiUrl+"/masters/membership/")
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


  addMemberShip(membership: MemberShip): void {
    this.dialogData = membership;

    this.httpClient.post(environment.apiUrl+"/masters/membership/", membership)
      .subscribe({
        next: (data) => {
          this.dialogData = membership;
        },
        error: (error: HttpErrorResponse) => {
          console.log(error);
        },
      });
  }


  updateMemberShip(membership: MemberShip): void {
    this.dialogData = membership;
    this.httpClient.put(environment.apiUrl + "/masters/membership/", membership)
      .subscribe({
        next: (data) => {
          this.dialogData = membership;
        },
        error: (error: HttpErrorResponse) => {
          console.log(error);
        },
      });
  }


  deleteMemberShip(id: number): void {

    this.httpClient.delete(environment.apiUrl+"/masters/membership/" + id)
      .subscribe({
        next: (data) => {
          console.log(id);
        },
        error: (error: HttpErrorResponse) => {
          console.log(error);
        },
      });
  }

  statusMemberShip(id: number,type:string): void {
    this.httpClient.patch(environment.apiUrl+"/masters/membership/" + id+"/"+type,{},{})
      .subscribe({
        next: (data) => {
          console.log(id);
        },
        error: (error: HttpErrorResponse) => {
          console.log(error);
        },
      });
  }


  getMemberShips() {
    this.httpClient.get<MemberShipResponse>(environment.apiUrl+"/masters/membership/")
     .subscribe({
               next : (data1) => {
                 this.memberships$.next(data1.data);
               },
               error: (error: HttpErrorResponse) => {
                 console.log(error.name + ' ' + error.message);
               },
           });
   }


}
