import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { endpoint } from '@shared/apis/endpoint';
import { BaseResponse } from '@shared/models/base-api-response.interface';
import { AlertService } from '@shared/services/alert.service';
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment as env } from "src/environments/environment";
import { getIcon } from '@shared/functions/helpers';
import { MenuRoleResponse } from '../models/menu-role-response.interface';
import { MenuRoleRequest } from '../models/menu-role-request.interface';

@Injectable({
  providedIn: 'root'
})
export class MenuRoleService {

  constructor(private _http: HttpClient, private _alert: AlertService) {}

  GetAll(size, sort, order, page, getInputs): Observable<BaseResponse> {
    const requestUrl = `${env.apiCredentials}${
      endpoint.LIST_MEMUROLES
    }?records=${size}&sort=${sort}&order=${order}&numPage=${
      page + 1
    }${getInputs}`;

    return this._http.get<BaseResponse>(requestUrl).pipe(
      map((data: BaseResponse) => {
        console.log("Menu Edit: ", data);
        data.data.forEach(function (e: MenuRoleResponse) {
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
          e.icEdit = getIcon("icEdit", "Editar Menu-Role", true);
          e.icDelete = getIcon("icDelete", "Eliminar Menu-Role", true);
        });
        return data;
      })
    );
  }

  MenuRoleRegister(menuRole: MenuRoleRequest): Observable<BaseResponse> {
    const requestUrl = `${env.apiCredentials}${endpoint.MENUROLE_REGISTER}`;
    return this._http.post(requestUrl, menuRole).pipe(
      map((resp: BaseResponse) => {
        return resp;
      })
    );
  }

  MenuRoleById(menuRoleId: number): Observable<MenuRoleResponse> {
    const requestUrl = `${env.apiCredentials}${endpoint.MENUROLE_BY_ID}${menuRoleId}`;
    return this._http.get(requestUrl).pipe(
      map((resp: BaseResponse) => {
        return resp.data;
      })
    );
  }

  MenuRoleEdit(
    menuRoleId: number,
    menuRole: MenuRoleRequest
  ): Observable<BaseResponse> {
    const requestUrl = `${env.apiCredentials}${endpoint.MENUROLE_EDIT}${menuRoleId}`;
    return this._http.put(requestUrl, menuRole).pipe(
      map((resp: BaseResponse) => {
        return resp;
      })
    );
  }

  MenuRoleRemove(menuRoleId: number): Observable<BaseResponse> {
    const requestUrl = `${env.apiCredentials}${endpoint.MENUROLE_REMOVE}${menuRoleId}`;
    return this._http.put<BaseResponse>(requestUrl, "");
  }

  MenuRoleRecover(menuRoleId: number): Observable<void> {
    const requestUrl = `${env.apiCredentials}${endpoint.MENUROLE_RECOVER}${menuRoleId}`;
    return this._http.put(requestUrl, "").pipe(
      map((resp: BaseResponse) => {
        if (resp.isSuccess) {
          this._alert.success("Excelente", resp.message);
        }
      })
    );
  }



}

