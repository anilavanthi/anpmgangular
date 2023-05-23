import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { MemberShipService } from '../../membership.service';
import {
  UntypedFormControl,
  Validators,
  UntypedFormGroup,
  UntypedFormBuilder,
} from '@angular/forms';
import { MemberShip } from '../../membership.model';
import { MAT_DATE_LOCALE } from '@angular/material/core';


export interface DialogData {
  id: number;
  action: string;
  membership: MemberShip;
}

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.scss'],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' }],
})
export class AddMemberShipFormComponent {
  action: string;
  dialogTitle: string;
  membership: MemberShip;
  tempmembership!: MemberShip;
  membershipNew! : MemberShip ; // Temporarly stores
  membershipForm: UntypedFormGroup;
  constructor(
    public dialogRef: MatDialogRef<AddMemberShipFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public membershipService: MemberShipService,
    private fb: UntypedFormBuilder
  ) {
    // Set the defaults
    this.action = data.action;
    if (this.action === 'edit') {
      this.dialogTitle = 'Edit MemberShip';
      this.membership = data.membership;
    } else {
      this.dialogTitle = 'Add MemberShip';
      const blankObject = {} as MemberShip;
      this.membership = new MemberShip(blankObject);
    }
    this.membershipForm = this.createContactForm();
  }
  formControl = new UntypedFormControl('', [
    Validators.required,
    // Validators.email,
  ]);
  getErrorMessage() {
    return this.formControl.hasError('required')
      ? 'Required field'
      : this.formControl.hasError('email')
        ? 'Not a valid email'
        : '';
  }
  createContactForm(): UntypedFormGroup {
    return this.fb.group({
      planname: [this.membership.planname, [Validators.required]],
      plantype: [this.membership.plantype, [Validators.required]],
      duration: [this.membership.duration, [Validators.required]],
      contactsno: [this.membership.contactsno, [Validators.required]],
      amount: [this.membership.amount, [Validators.required]],
    });
  }
  submit() {
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  public confirmAdd(): void {
    if(this.action === 'edit'){
      const blankObject = {} as MemberShip;
      this.membershipNew = new MemberShip(blankObject);
      this.tempmembership = this.membershipForm.getRawValue();
      this.membershipNew.id = this.membership.id;
      this.membershipNew.planname = this.tempmembership.planname;
      this.membershipNew.plantype = this.tempmembership.plantype;
      this.membershipNew.duration = this.tempmembership.duration;
      this.membershipNew.contactsno = this.tempmembership.contactsno;
      this.membershipNew.amount = this.tempmembership.amount;
      this.membershipNew.status =this.membership.status;
      this.membershipNew.smsenable =this.membership.smsenable;
      this.membershipNew.emailenable =this.membership.emailenable;
      this.membershipNew.personalassistance =this.membership.personalassistance;
      this.membershipNew.photozoom =this.membership.photozoom;
      this.membershipNew.sendinterest =this.membership.sendinterest;
      this.membershipNew.profilesuggestions =this.membership.profilesuggestions;
      this.membershipService.updateMemberShip(this.membershipNew);
    }
    else{
      this.membership = this.membershipForm.getRawValue();
      const blankObject = {} as MemberShip;
      this.membershipNew = new MemberShip(blankObject);
      this.membershipNew.planname = this.membership.planname;
      this.membershipNew.plantype = this.membership.plantype;
      this.membershipNew.duration = this.membership.duration;
      this.membershipNew.contactsno = this.membership.contactsno;
      this.membershipNew.amount = this.membership.amount;
      this.membershipNew.status =1;
      this.membershipNew.smsenable =1;
      this.membershipNew.emailenable =1;
      this.membershipNew.personalassistance =1;
      this.membershipNew.photozoom =1;
      this.membershipNew.sendinterest =1;
      this.membershipNew.profilesuggestions =1;
      this.membershipService.addMemberShip(this.membershipNew);
    }
      
  }

  
  onInput(event: any) {
    // Get input value and remove non-numeric characters
    const inputValue = event.target.value.replace(/[^0-9]/g, '');
    // Update input value
    event.target.value = inputValue;
    // Update ngModel value
    // this.mobile = inputValue;
  }

}

