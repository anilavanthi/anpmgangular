import { Component } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.scss'],
})
export class AddCustomerComponent {
  custForm: UntypedFormGroup;
  breadscrums = [
    {
      title: 'Add Customer',
      items: ['Customer'],
      active: 'Add Customer',
    },
  ];
  constructor(private fb: UntypedFormBuilder) {
    this.custForm = this.fb.group({
      fname: ['', [Validators.required, Validators.pattern('[a-zA-Z]+')]],
      surname: [''],
      gender: ['', [Validators.required]],
      mobile: ['', [Validators.required]],
      email: [
        '',
        [Validators.required, Validators.email, Validators.minLength(5)],
      ],
      aadhar:['',],
      dob: ['', [Validators.required]],
      birth:['',],
      religion: [''],
      caste: [''],
      subcaste: [''],
      star: [''],
      rasi: [''],
      paadam: [''],
      gothram: [''],
      dosham: [''],
      height: [''],
      blood: [''],
      tongue: [''],
      health: [''],
      complex: [''],
      marital: [''],
      smoke: [''],
      drink: [''],
      food: [''],
      address: [''], 
      hobbies: [''],
      interest: [''],
      music: [''],
      sports: [''],
      cuisine: [''],
      reads:[''],
      movies: [''],
      style: [''],
      spoken: [''],
      country: [''],
      state: [''],
      district: [''],
      city: [''],
      altaddress:[''],
      altmobile:[''],
      altemail:[''],
      appl: [''],
      source: [''],
      near: [''],
      education:[''],
      universe:[''],
      emply:[''],
      design:[''],
      profession:[''],
      work:[''],
      property:[''],
      annual:[''],
      fstatus: [''],
      ftype: [''],
      fathername:[''],
      freligion:[''],
      fcaste:[''],
      isconvert:[''],
      fatherstatus:[''],
      pension:[''],
      mname:[''],
      maidenname:[''],
      mreligion:[''],
      mcaste:[''],
      mconvert:[''],
      motherstat:[''],
      peraddress:[''],
      presentaddress:[''],
      brothers:[''],
      sisters:[''],
      refname:[''],
      refmobile:[''],
      refaddress:[''],
      plooking:[''],
      age: [''],
      pheight:[''],
      pfstatus:[''],
      pintercaste:[''],
      khujadosham:[''],
      complexion:[''],
      psmoke:[''],
      pdrink:[''],
      peducation:[''],
      pprofession:[''],
      passport:[''],
      uploadFile: [''],
      
    });
  }
  onSubmit() {
    console.log('Form Value', this.custForm.value);
  }
}
