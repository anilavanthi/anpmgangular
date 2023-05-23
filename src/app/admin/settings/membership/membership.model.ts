
export class MemberShipResponse{
  data : MemberShip[]=[];
  status! : number;
  msg! : string;
}
export class MemberShip{
  id : number;
  planname: string;
  plantype:string;
  duration:number;
  contactsno:number;
  amount:number;
  status: number;
  smsenable:number;
  emailenable:number;
  personalassistance:number;
  photozoom:number;
  sendinterest:number;
  profilesuggestions:number;
  constructor(membership: MemberShip) {
    {
      this.id = membership.id;
      this.planname = membership.planname || '';
      this.plantype = membership.plantype || '';
      this.duration = membership.duration;
      this.contactsno=membership.contactsno;
      this.amount=membership.amount;
      this.status =membership.status;
      this.smsenable=membership.smsenable;
      this.emailenable=membership.emailenable;
      this.profilesuggestions=membership.profilesuggestions;
      this.photozoom=membership.photozoom;
      this.personalassistance=membership.personalassistance;
      this.sendinterest=membership.sendinterest;
    }
  }
}
