export interface DepartmentResponse{
    departmentId: number;
    name: string;
    auditCreateDate: Date;
    state: number;
    stateCountry: string;
    badgeColor: string;
    icEdit: any;
    icDelete: any;
}

export interface DepartmenteSelectResponse {
    departmentId: number;
    name: string;
  }