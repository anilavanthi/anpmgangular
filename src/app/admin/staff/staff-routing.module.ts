import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllstaffComponent } from './all-staff/all-staff.component';
import { AddStaffComponent } from './add-staff/add-staff.component';
import { EditStaffComponent } from './edit-staff/edit-staff.component';
import { AboutStaffComponent } from './about-staff/about-staff.component';
import { ActiveStaffComponent } from './active-staff/active-staff.component';
import { BannedStaffComponent } from './banned-staff/banned-staff.component';
import { EmailStaffUnverifiedComponent } from './email-staff-unverified/email-staff-unverified.component';
import { MobileStaffUnverifiedComponent } from './mobile-staff-unverified/mobile-staff-unverified.component';

const routes: Routes = [
  {
    path: 'all-staff',
    component: AllstaffComponent
  },
  {
    path: 'add-staff',
    component: AddStaffComponent
  },
  {
    path: 'edit-staff',
    component: EditStaffComponent
  },
  {
    path: 'about-staff/:id',
    component: AboutStaffComponent
  },
  {
    path: 'active-staff',
    component: ActiveStaffComponent
  },
  {
    path: 'banned-staff',
    component: BannedStaffComponent
  },
  {
    path: 'email-staff-unverified',
    component: EmailStaffUnverifiedComponent
  },
  {
    path: 'mobile-staff-unverified',
    component: MobileStaffUnverifiedComponent
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaffRoutingModule {}
