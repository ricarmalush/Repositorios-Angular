import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { endpoint } from "@shared/apis/endpoint";
import { BaseResponse } from "@shared/models/base-api-response.interface";
import { AlertService } from "@shared/services/alert.service";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment as env } from "src/environments/environment";
import { getIcon } from "@shared/functions/helpers";
import { ComboSelectService } from "@shared/services/combos.service";
import { UserCompanyResponse } from "../models/user-company-response.interface";
import { UserCompanyRequest } from "../models/user-company-request.interface";

@Injectable({
  providedIn: "root",
})
export class UsercompanyService {
  constructor(
    private _http: HttpClient,
    private _alert: AlertService,
    private comboSelectService: ComboSelectService
  ) {}

  GetAll(size, sort, order, page, getInputs): Observable<BaseResponse> {
    const requestUrl = `${env.apiCredentials}${
      endpoint.LIST_USERCOMPANY
    }?records=${size}&sort=${sort}&order=${order}&numPage=${
      page + 1
    }${getInputs}`;

    return this._http.get<BaseResponse>(requestUrl).pipe(
      map((data: BaseResponse) => {
        data.data.forEach(function (e: UserCompanyResponse) {
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
          e.icEdit = getIcon("icEdit", "Editar UserCompany", true);
          e.icDelete = getIcon("icDelete", "UserCompany", true);
        });
        return data;
      })
    );
  }

  UserCompanyRegister(
    userCompany: UserCompanyRequest
  ): Observable<BaseResponse> {
    const requestUrl = `${env.apiCredentials}${endpoint.USERCOMPANY_REGISTER}`;
    return this._http.post(requestUrl, userCompany).pipe(
      map((resp: BaseResponse) => {
        return resp;
      })
    );
  }

  UserCompanyById(userCompanyId: number): Observable<UserCompanyResponse> {
    const requestUrl = `${env.apiCredentials}${endpoint.USERCOMPANY_BY_ID}${userCompanyId}`;
    return this._http.get(requestUrl).pipe(
      map((resp: BaseResponse) => {
        return resp.data;
      })
    );
  }

  UserCompanyEdit(
    userCompanyId: number,
    userCompany: UserCompanyRequest
  ): Observable<BaseResponse> {
    const requestUrl = `${env.apiCredentials}${endpoint.USERCOMPANY_EDIT}${userCompanyId}`;
    return this._http.put(requestUrl, userCompany).pipe(
      map((resp: BaseResponse) => {
        return resp;
      })
    );
  }

  UserCpmpanyRemove(userCompanyId: number): Observable<BaseResponse> {
    const requestUrl = `${env.apiCredentials}${endpoint.USERCOMPANY_REMOVE}${userCompanyId}`;
    return this._http.put<BaseResponse>(requestUrl, "");
  }

  UserCompanyRecover(userCompanyId: number): Observable<void> {
    const requestUrl = `${env.apiCredentials}${endpoint.USERCOMPANY_RECOVER}${userCompanyId}`;
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

  CompanySelect(): Observable<string[]> {
    return this.comboSelectService.CompanySelect();
  }

  DepartmentSelect(): Observable<string[]> {
    return this.comboSelectService.DepartmentSelect();
  }
}
