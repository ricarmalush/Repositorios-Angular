export interface CompanyResponse {
    companyId:number;
    countryId:number;
    provinceId:number;
    communityId: number;
    documentTypeId: number;
    companyName: string,
    documentName: string,
    numDocument: string,
    countryName: string,
    provinceName: string;
    communityName: string,
    address: string;
    email: string,
    fax: string,
    telephone: string,
    auditCreateDate: Date;
    state: number,
    badgeColor: string;
    icEdit: any;
    icDelete: any;
   }

   export interface ProvinceByCommunityResponse {
    communityId: number;
    communityName: string;
  }