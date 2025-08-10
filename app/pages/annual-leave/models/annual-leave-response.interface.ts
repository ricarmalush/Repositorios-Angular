export interface AnnualLeaveResponse {
    annualLeaveId: number;  
    userId: number;
    fullName:string;
    anyo: number;
    state: number;
    daysAvailable: number;
    stateAnnualLeaveBalance:string;
    auditCreateDate: Date;
    badgeColor: string;
    icEdit: any;
    icDelete: any;
  }