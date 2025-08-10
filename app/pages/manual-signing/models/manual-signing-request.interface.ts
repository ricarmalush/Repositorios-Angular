export interface ManualSigningRequest {
  signingUpId: number;
  userId: number;
  type: string;
  signingDateTime: Date; 
  provinceId: number;
  province: string;
  communityId:number;
  comunity:string;
  street: string;
  cause: string;
  clockCreateBy: string;
}

