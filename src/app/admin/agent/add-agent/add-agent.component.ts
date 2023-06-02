import { Component } from '@angular/core';
import { CountryService } from '../../settings/country/country.service';
import { StateService } from '../../settings/state/state.service';
import { DistrictService } from '../../settings/district/district.service';
import { CityService } from '../../settings/city/city.service';
import { EducationdetailsService } from '../../settings/educationdetails/educationdetails.service';
import {BehaviorSubject,Observable } from 'rxjs';
import { Country, CountryResponse } from '../../settings/country/country.model';
import { State,StateResponse } from '../../settings/state/state.model';
import { District, DistrictResponse } from '../../settings/district/district.model';
import { City, CityResponse } from '../../settings/city/city.model';
import { Educationdetails,EducationdetailsResponse } from '../../settings/educationdetails/educationdetails.model';
import { ValidatorFn, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AgentService } from '../all-agent/agent.service';
import { Agent,AgentResponse,SingleAgentResponse,User } from '../all-agent/agent.model';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
@Component({
  selector: 'app-add-agent',
  templateUrl: './add-agent.component.html',
  styleUrls: ['./add-agent.component.scss'],
  providers: [ StateService,CountryService,DistrictService,CityService,EducationdetailsService]
})
export class AddAgentComponent {
  agentForm: UntypedFormGroup;
  breadscrums = [
    {
      title: 'Add Agent',
      items: ['Agent'],
      active: 'Add Agent',
    },
  ];
  public countries$: BehaviorSubject<Country[]> = new BehaviorSubject<Country[]>([]);
  public states$: BehaviorSubject<State[]> = new BehaviorSubject<State[]>([]);
  public districts$: BehaviorSubject<District[]> = new BehaviorSubject<District[]>([]);
  public cities$: BehaviorSubject<City[]> = new BehaviorSubject<City[]>([]);
  public educations$: BehaviorSubject<Educationdetails[]> = new BehaviorSubject<Educationdetails[]>([]);
  agent!:Agent;
  user!:User;
  userNew!:User;
  agentNew!:Agent;
  file!:File;
  constructor(private fb: UntypedFormBuilder,
    private stateService: StateService,
    private countryService : CountryService,
    private districtService : DistrictService,
    private cityService : CityService,
    private educationService : EducationdetailsService,
    private agentService : AgentService,
    private snackBar: MatSnackBar,
    private router: Router
    ) {
    this.agentForm = this.fb.group({
      first_name: ['', [Validators.required, Validators.pattern('[a-zA-Z]+')]],
      last_name: [''],
      phone: ['', [Validators.required,Validators.pattern('^[0-9]*$')]],
      email: [
        '',
        [Validators.required, Validators.email, Validators.minLength(5)],
      ],
      gender: ['', [Validators.required]],
      matrialStatus : [''],
      dob: ['', [Validators.required]],
      education : [''],
      address: [''],
      country : [''],
      state : [''],
      district : [''],
      city : [''],
      aadharno : [''],
      bankaccno : [''],
      bankname : [''],
      bankifsccode : [''],
      bankbranchname : [''],
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      conformPassword: ['', [Validators.required]],
      
     
   
      photo:[''],
    });
  }
  onSubmit() {
    if(this.agentForm.value.password !== this.agentForm.value.conformPassword){
      this.showNotification(
        'snackbar-danger',
        'Password and ConfirmPassword Mismatch...!!!',
        'top',
        'center'
      );
      return;
    }
    
    this.user = this.agentForm.getRawValue();
    this.agent = this.agentForm.getRawValue();
    const blankObject1 = {} as User;
    this.userNew = new User(blankObject1);
    this.userNew.password = this.user.password;
    this.userNew.email = this.user.email;
    this.userNew.phone = this.user.phone;
    this.userNew.first_name = this.user.first_name;
    this.userNew.last_name = this.user.last_name;
    this.userNew.address = this.user.address;
    this.userNew.username = this.user.username;
    this.userNew.state = this.user.state;
    this.userNew.district = this.user.district;
    this.userNew.city = this.user.city;
    this.userNew.is_agent=1;

      const blankObject = {} as Agent;
      this.agentNew = new Agent(blankObject);
      this.agentNew.gender = this.agent.gender;
      this.agentNew.maritalStatus = this.agent.maritalStatus;
      this.agentNew.education = this.agent.education;
      this.agentNew.aadharno = this.agent.aadharno;
      this.agentNew.bankaccno = this.agent.bankaccno;
      this.agentNew.bankname = this.agent.bankname;
      this.agentNew.bankifsccode = this.agent.bankifsccode;
      this.agentNew.bankbranchname = this.agent.bankbranchname;
      this.agentNew.dob = this.agent.dob;
      this.agentNew.status = 1;
      this.agentNew.user= this.userNew; 
      //this.staffNew.photo = this.staff.photo;
    //  this.staffNew.photo = this.file;

     //console.log(this.staffNew);

  this.agentService.addAgent(this.agentNew,this.file);

    this.showNotification(
      'snackbar-success',
      'Add Record Successfully...!!!',
      'top',
      'center'
    );
   this.router.navigate(['admin/dashboard/main']);
  }

  onInput(event: any) {
    // Get input value and remove non-numeric characters
    const inputValue = event.target.value.replace(/[^0-9]/g, '');
    // Update input value
    event.target.value = inputValue;
    // Update ngModel value
    // this.mobile = inputValue;
  }
  
  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    this.file = file;
    //this.staff.photo = file;
}

  showNotification(
    colorName: string,
    text: string,
    placementFrom: MatSnackBarVerticalPosition,
    placementAlign: MatSnackBarHorizontalPosition
  ) {
    this.snackBar.open(text, '', {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }

  ngOnInit() {
    this.countryService.getCountries();
    this.countries$ = this.countryService.countries$;
    this.educationService.getEducations();
    this.educations$=this.educationService.educations$;
   }

   public onCountryChange(e:any){
    this.stateService.onCountryChangeState(e);
    this.states$ = this.stateService.states$;
   }

   public onCountryStateChangeDistrict(e:any){
    this.districtService.onCountryStateChangeDistrict(e);
    this.districts$ = this.districtService.districts$;
   }

   public onCountryStateDistrictChangeCity(e:any){
    this.cityService.onCountryStateDistrictChangeCity(e);
    this.cities$ = this.cityService.cities$;
   }

}

