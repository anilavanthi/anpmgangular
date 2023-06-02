export class SingleAgentResponse{
  data! : Agent;
  msg! : string;
}
export class AgentResponse{
    data : Agent[]=[];
    msg! : string;
  }
  export class Agent{
      id : number;
      gender: string;
      maritalStatus:string;
      education: number;
      aadharno:string;
      dob: string;
      bankaccno: string;
      bankname:string;
      bankifsccode: string;
      bankbranchname:string;
      status:number;
      education_name! : string;
      user! : User;
      photo! : File;
      constructor(agent: Agent) {
        {
          this.id = agent.id;
          this.gender = agent.gender || '';
          this.maritalStatus = agent.maritalStatus || '';
          this.education = agent.education;
          this.aadharno = agent.aadharno || '';
          this.dob = agent.dob || '';
          this.bankaccno = agent.bankaccno || '';
          this.bankname = agent.bankname || '';
          this.bankifsccode = agent.bankifsccode || '';
          this.bankbranchname = agent.bankbranchname || '';
          this.status =agent.status;
         // this.photo = staff.photo;
        }
      }
    }
  
    export class User{
        id : number;
        password: string;
        username:string;
        email: string;
        phone:string;
        first_name: string;
        last_name:string;
        address: string;
        state:number;
        district: number;
        city:number;
        is_agent:number;
        state_name! : string;
        district_name! : string;
        city_name! : string;
        pincode!:string;
        constructor(user: User) {
          {
            this.id = user.id;
            this.password = user.password || '';
            this.username = user.username || '';
            this.email = user.email || '';
            this.phone = user.phone || '';
            this.first_name = user.first_name || '';
            this.last_name = user.last_name || '';
            this.address = user.address || '';
            this.state = user.state;
            this.district = user.district;
            this.city = user.city;
            this.is_agent = user.is_agent;
            this.username = user.username || '';
          }
        }
      }