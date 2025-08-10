export interface DocumentTypeResponse{
    documentTypeId: number;
    name: string;
    auditCreateDate: Date;
    state: number;
    stateCountry: string;
    badgeColor: string;
    icEdit: any;
    icDelete: any;
}

export interface DocumentTypeSelectResponse {
    documentTypeId: number;
    name: string;
  }