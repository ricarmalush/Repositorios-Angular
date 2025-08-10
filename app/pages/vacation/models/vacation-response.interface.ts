export interface VacationResponse {
    vacationId: number;
    userId: number;
    daysEnjoned:  number;
    pendingDays: number;
    auditCreateDate: Date;
    startDate: Date;
    endDate: Date;
    state: number;
    status: string;
    stateVacation: string;
    badgeColor: string;
    icEdit: any;
    icDelete: any;
  }