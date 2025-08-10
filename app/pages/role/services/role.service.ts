import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { endpoint } from '@shared/apis/endpoint';
import { BaseResponse } from '@shared/models/base-api-response.interface';
import { AlertService } from '@shared/services/alert.service';
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment as env } from "src/environments/environment";
import { getIcon } from '@shared/functions/helpers';
import { RoleResponse } from '../models/role-response.interface';
import { RoleRequest } from '../models/role-request.interface';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private _http: HttpClient, private _alert: AlertService) {}

  GetAll(size, sort, order, page, getInputs): Observable<BaseResponse> {
    const requestUrl = `${env.apiCredentials}${
      endpoint.LIST_ROLES
    }?records=${size}&sort=${sort}&order=${order}&numPage=${
      page + 1
    }${getInputs}`;

    return this._http.get<BaseResponse>(requestUrl).pipe(
      map((data: BaseResponse) => {
        data.data.forEach(function (e: RoleResponse) {
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
          e.icEdit = getIcon("icEdit", "Editar Role", true);
          e.icDelete = getIcon("icDelete", "Eliminar Role", true);
        });
        return data;
      })
    );
  }

  RoleRegister(role: RoleRequest): Observable<BaseResponse> {
    const requestUrl = `${env.apiCredentials}${endpoint.ROLE_REGISTER}`;
    return this._http.post(requestUrl, role).pipe(
      map((resp: BaseResponse) => {
        return resp;
      })
    );
  }

  RoleById(roleId: number): Observable<RoleResponse> {
    const requestUrl = `${env.apiCredentials}${endpoint.ROLE_BY_ID}${roleId}`;
    return this._http.get(requestUrl).pipe(
      map((resp: BaseResponse) => {
        return resp.data;
      })
    );
  }

  RoleEdit(
    roleId: number,
    role: RoleRequest
  ): Observable<BaseResponse> {
    const requestUrl = `${env.apiCredentials}${endpoint.ROLE_EDIT}${roleId}`;
    return this._http.put(requestUrl, role).pipe(
      map((resp: BaseResponse) => {
        return resp;
      })
    );
  }

  RoleRemove(roleId: number): Observable<BaseResponse> {
    const requestUrl = `${env.apiCredentials}${endpoint.ROLE_REMOVE}${roleId}`;
    return this._http.put<BaseResponse>(requestUrl, "");
  }

  RoleRecover(roleId: number): Observable<void> {
    const requestUrl = `${env.apiCredentials}${endpoint.ROLE_RECOVER}${roleId}`;
    return this._http.put(requestUrl, "").pipe(
      map((resp: BaseResponse) => {
        if (resp.isSuccess) {
          this._alert.success("Excelente", resp.message);
        }
      })
    );
  }


}
