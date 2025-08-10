import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { endpoint } from '@shared/apis/endpoint';
import { BaseResponse } from '@shared/models/base-api-response.interface';
import { AlertService } from '@shared/services/alert.service';
import { Observable } from "rxjs";
import { map  } from "rxjs/operators";
import { environment as env } from "src/environments/environment";
import { getIcon } from '@shared/functions/helpers';
import { MenuResponse } from '../models/menu-response.interface';
import { MenuRequest } from '../models/menu-request.interface';


@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private _http: HttpClient, private _alert: AlertService) {}

  GetAll(size, sort, order, page, getInputs): Observable<BaseResponse> {
    const requestUrl = `${env.apiCredentials}${
      endpoint.LIST_MENUS
    }?records=${size}&sort=${sort}&order=${order}&numPage=${
      page + 1
    }${getInputs}`;

    return this._http.get<BaseResponse>(requestUrl).pipe(
      map((data: BaseResponse) => {
        data.data.forEach(function (e: MenuResponse) {
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
          e.icEdit = getIcon("icEdit", "Editar Menú", true);
          e.icDelete = getIcon("icDelete", "Eliminar Menú", true);
        });
        return data;
      })
    );
  }

  MenuRegister(menu: MenuRequest): Observable<BaseResponse> {
    const requestUrl = `${env.apiCredentials}${endpoint.MENU_REGISTER}`;
    return this._http.post(requestUrl, menu).pipe(
      map((resp: BaseResponse) => {
        return resp;
      })
    );
  }

  MenuById(menuId: number): Observable<MenuResponse> {
    const requestUrl = `${env.apiCredentials}${endpoint.MENU_BY_ID}${menuId}`;
    return this._http.get(requestUrl).pipe(
      map((resp: BaseResponse) => {
        return resp.data;
      })
    );
  }

  MenuEdit(
    menuId: number,
    menu: MenuRequest
  ): Observable<BaseResponse> {
    const requestUrl = `${env.apiCredentials}${endpoint.MENU_EDIT}${menuId}`;
    return this._http.put(requestUrl, menu).pipe(
      map((resp: BaseResponse) => {
        return resp;
      })
    );
  }

  MenuRemove(menuId: number): Observable<BaseResponse> {
    const requestUrl = `${env.apiCredentials}${endpoint.MENU_REMOVE}${menuId}`;
    return this._http.put<BaseResponse>(requestUrl, "");
  }

  MenuRecover(menuId: number): Observable<void> {
    const requestUrl = `${env.apiCredentials}${endpoint.MENU_RECOVER}${menuId}`;
    return this._http.put(requestUrl, "").pipe(
      map((resp: BaseResponse) => {
        if (resp.isSuccess) {
          this._alert.success("Excelente", resp.message);
        }
      })
    );
  }

  MenuList(): Observable<MenuResponse[]> {
    const requestUrl = `${env.apiCredentials}${endpoint.MENUS_SELECT}`;
    return this._http.get<BaseResponse>(requestUrl).pipe(
      map((resp: BaseResponse) => {
        return resp.data;
      })
    );
    }


}


