export interface CommunityResponse {
    countryId: number;  
    provinceId: number;
    communityId: number;
    provinceName: string;
    countryName: string;
    communityName: string;
    state: number;
    cp:string;
    StateCommunity: string;
    auditCreateDate: Date;
    badgeColor: string;
    icEdit: any;
    icDelete: any;
  }

  export interface ProvinceByCountryResponse {
    provinceId: number;
    provinceName: string;
  }