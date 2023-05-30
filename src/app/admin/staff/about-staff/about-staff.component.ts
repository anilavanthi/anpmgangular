import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {BehaviorSubject,Observable, firstValueFrom } from 'rxjs';
import { StaffService } from '../staff.service';
import { Staff,StaffResponse,User } from '../staff.model';

@Component({
  selector: 'app-about-staff',
  templateUrl: './about-staff.component.html',
  styleUrls: ['./about-staff.component.scss'],
  providers :[StaffService]
})
export class AboutStaffComponent {
  breadscrums = [
    {
      title: 'Profile',
      items: ['Staff'],
      active: 'Profile',
    },
  ];
  public staff$: BehaviorSubject<Staff[]> = new BehaviorSubject<Staff[]>([]);
  public data!: any[];
  constructor(
    private route: ActivatedRoute,
    private staffService : StaffService,
  ) {
    // constructor;
  }

  ngOnInit() {
    const staffId = this.route.snapshot.paramMap.get('id');
    const id: number = Number(staffId);
    this.staffService.getStaffData(id);
    this.staff$ = this.staffService.staff$;
   // console.log(this.staff$);
    this.staff$.subscribe(value=>{
      this.updateData(value);
    });
     console.log(this.data);
  }

  updateData(value: any[]): void {
    this.data = value;
  }
  
}
