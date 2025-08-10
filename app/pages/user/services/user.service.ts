import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { endpoint } from "@shared/apis/endpoint";
import { BaseResponse } from "@shared/models/base-api-response.interface";
import { AlertService } from "@shared/services/alert.service";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment as env } from "src/environments/environment";
import { getIcon } from "@shared/functions/helpers";
import { UserResponse } from "../models/user-response.interface";
import { UserRequest } from "../models/user-request.interface";

@Injectable({
  providedIn: "root",
})
export class UserService {
  
  constructor(private _http: HttpClient, 
              private _alert: AlertService) {}

  GetAll(size, sort, order, page, getInputs): Observable<BaseResponse> {
    const requestUrl = `${env.apiCredentials}${
      endpoint.LIST_USER
    }?records=${size}&sort=${sort}&order=${order}&numPage=${
      page + 1
    }${getInputs}`;

    return this._http.get<BaseResponse>(requestUrl).pipe(
      map((data: BaseResponse) => {
        data.data.forEach(function (e: UserResponse) {
          switch (e.state) {
            case 0:
              e.badgeColor = "text-gray bg-gray-light";
              break;
            case 1:
              e.badgeColor = "text-green bg-green-light";
              break;
            default:
              e.badgeColor = "text-gray bg-gray-light";
              break;
          }
          e.icEdit = getIcon("icEdit", "Editar Usuario", true);
          e.icDelete = getIcon("icDelete", "Eliminar Usuario", true);
        });
        console.log("Data: ", data)
        return data;
      })
    );
  }

  UserRegister(user: UserRequest): Observable<BaseResponse> {
    const requestUrl = `${env.apiCredentials}${endpoint.USER_REGISTER}`;
    return this._http.post(requestUrl, user).pipe(
      map((resp: BaseResponse) => {
        return resp;
      })
    );
  }

  UserById(userId: number): Observable<UserResponse> {
    const requestUrl = `${env.apiCredentials}${endpoint.USER_BY_ID}${userId}`;
    return this._http.get(requestUrl).pipe(
      map((resp: BaseResponse) => {
        return resp.data;
      })
    );
  }

  UserEdit(userId: number, user: UserRequest): Observable<BaseResponse> {
    const requestUrl = `${env.apiCredentials}${endpoint.USER_EDIT}${userId}`;
    return this._http.put(requestUrl, user).pipe(
      map((resp: BaseResponse) => {
        return resp;
      })
    );
  }

  UserRemove(userId: number): Observable<BaseResponse> {
    const requestUrl = `${env.apiCredentials}${endpoint.USER_REMOVE}${userId}`;
    return this._http.put<BaseResponse>(requestUrl, "");
  }

  UserRecover(userId: number): Observable<void> {
    const requestUrl = `${env.apiCredentials}${endpoint.USER_RECOVER}${userId}`;
    return this._http.put(requestUrl, "").pipe(
      map((resp: BaseResponse) => {
        if (resp.isSuccess) {
          this._alert.success("Excelente", resp.message);
        }
      })
    );
  }
}
