//Interface base generica de response 
export interface BaseResponse {
  isSuccess: boolean;
  data: any;
  totalRecords: number;
  message: any;
  errors: any;
}
