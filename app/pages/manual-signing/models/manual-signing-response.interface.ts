export interface ManualSigningResponse {
  signingUpId: number;
  userId: number;
  provinceId: number;
  province: string;
  communityId:number;
  community:string;
  signingDateTime: Date;  
  clockCreateBy: string;
  latitude: string;
  longitude: string;
  cause: string;
  street: string;
  stateClock: string;
  type: string;
  state: number;
  auditCreateDate: Date; 
  badgeColor: string;
  icEdit: any;
  icDelete: any;
  data:any;
}


