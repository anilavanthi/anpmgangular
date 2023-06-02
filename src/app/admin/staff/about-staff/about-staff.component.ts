import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {BehaviorSubject,Observable, firstValueFrom } from 'rxjs';
import { StaffService } from '../staff.service';
import { Staff,StaffResponse,User } from '../staff.model';
import { map } from 'rxjs/operators';

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
  public staff!: Staff |null | undefined ;
  public data:Staff[] = [];
  // public staff$: Observable<Staff[]>;
  constructor(
    private route: ActivatedRoute,
    private staffService : StaffService,
  ) {
    // constructor;
  }

  ngOnInit() {
    const staffId = this.route.snapshot.paramMap.get('id');
    const id: number = Number(staffId);
    this.staffService.getStaffData(id).subscribe((response)=>{
      this.staff = response.data;
    })
    
    // this.staff$ = this.staffService.staff$;
    // console.log(this.staff$);
    // this.staffService.staff$.subscribe((staffArray: Staff) => {
    //   console.log(staffArray);
    //   this.staff =staffArray;
    //   console.log(this.staff);
    //   // this.staff$.next(staffArray);
    //   // console.log(this.staff$.value.length); // This should display the correct length
    // });
    
    // this.staff$.subscribe(staffArray => {
    //     //const firstStaff = staffArray;
    //     // You can now access the staff properties, such as gender
    //     //console.log(firstStaff);
    //     // Assign the first staff to a class property if needed
    //     this.staff = staffArray;
    // });
  }
  
}
