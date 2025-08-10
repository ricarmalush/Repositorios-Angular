import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { endpoint } from '@shared/apis/endpoint';
import { BaseResponse } from '@shared/models/base-api-response.interface';
import { AlertService } from '@shared/services/alert.service';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { environment as env } from "src/environments/environment";
import { getIcon } from '@shared/functions/helpers';
import { ComboSelectService } from '@shared/services/combos.service';
import { UserRoleResponse } from '../models/user-role-response.interface';
import { UserRoleRequest } from '../models/user-role-request.interface';

@Injectable({
  providedIn: 'root'
})
export class UserRoleService {countries: string[]; // Declaración de la propiedad countries

constructor(private _http: HttpClient, 
            private _alert: AlertService, 
            private comboSelectService: ComboSelectService) {}

GetAll(size, sort, order, page, getInputs): Observable<BaseResponse> {
  const requestUrl = `${env.apiCredentials}${
    endpoint.LIST_USER_ROLE
  }?records=${size}&sort=${sort}&order=${order}&numPage=${
    page + 1
  }${getInputs}`;

  return this._http.get<BaseResponse>(requestUrl).pipe(
    map((data: BaseResponse) => {
      data.data.forEach(function (e: UserRoleResponse) {
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
        e.icEdit = getIcon("icEdit", "Editar User/Role", true);
        e.icDelete = getIcon("icDelete", "User/Role", true);
      });
      return data;
    })
  );
}

UserRoleRegister(userRole: UserRoleRequest): Observable<BaseResponse> {
  const requestUrl = `${env.apiCredentials}${endpoint.USER_ROLE_REGISTER}`;
  return this._http.post(requestUrl, userRole).pipe(
    map((resp: BaseResponse) => {
      console.log("Register: ", userRole);
      return resp;
    })
  );
}

UserRoleById(userRoleId: number): Observable<UserRoleResponse> {
  const requestUrl = `${env.apiCredentials}${endpoint.USER_ROLE_BY_ID}${userRoleId}`;
  return this._http.get(requestUrl).pipe(
    map((resp: BaseResponse) => {
      return resp.data;
    })
  );
}

UserRoleEdit(
  userRoleId: number,
  userRole: UserRoleRequest
): Observable<BaseResponse> {
  const requestUrl = `${env.apiCredentials}${endpoint.USER_ROLE_EDIT}${userRoleId}`;
  return this._http.put(requestUrl, userRole).pipe(
    map((resp: BaseResponse) => {
      return resp;
    })
  );
}

UserRoleRemove(userRoleId: number): Observable<BaseResponse> {
  const requestUrl = `${env.apiCredentials}${endpoint.USER_ROLE_REMOVE}${userRoleId}`;
  return this._http.put<BaseResponse>(requestUrl, "");
}


UserRoleRecover(userRoleId: number): Observable<void> {
  const requestUrl = `${env.apiCredentials}${endpoint.USER_ROLE_RECOVER}${userRoleId}`;
  return this._http.put(requestUrl, "").pipe(
    map((resp: BaseResponse) => {
      if (resp.isSuccess) {
        this._alert.success("Excelente", resp.message);
      }
    })
  );
}

UserSelect(): Observable<string[]> {
  return this.comboSelectService.UserSelect();
}

RoleSelect(): Observable<string[]> {
  return this.comboSelectService.RoleSelect();
}



}
