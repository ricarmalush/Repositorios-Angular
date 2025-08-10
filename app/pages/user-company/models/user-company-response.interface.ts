export interface UserCompanyResponse
{
    userCompanyId:number;
    userId: number;
    fullName: string;
    companyId: number;
    companyName: string;
    departmentId: number;
    departmentName: string;
    state:number;
    stateUserCompany: string;
    auditCreateDate: Date;
    badgeColor: string;
    icEdit: any;
    icDelete: any;
}