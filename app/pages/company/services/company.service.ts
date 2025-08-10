import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { endpoint } from "@shared/apis/endpoint";
import { BaseResponse } from "@shared/models/base-api-response.interface";
import { AlertService } from "@shared/services/alert.service";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment as env } from "src/environments/environment";
import { getIcon } from "@shared/functions/helpers";
import { CompanyResponse, ProvinceByCommunityResponse } from "../models/company-response.interface";
import { CompanyRequest } from "../models/company-request.interface";
import { ComboSelectService } from "@shared/services/combos.service";
import { ProvinceByCountryResponse } from "../../community/models/community-response.interface";

@Injectable({
  providedIn: "root",
})
export class CompanyService {
  constructor(
    private _http: HttpClient,
    private _alert: AlertService,
    private comboSelectService: ComboSelectService
  ) {}

  GetAll(size, sort, order, page, getInputs): Observable<BaseResponse> {
    const requestUrl = `${env.apiCredentials}${
      endpoint.LIST_COMPANY
    }?records=${size}&sort=${sort}&order=${order}&numPage=${
      page + 1
    }${getInputs}`;

    return this._http.get<BaseResponse>(requestUrl).pipe(
      map((data: BaseResponse) => {
        data.data.forEach(function (e: CompanyResponse) {
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
          e.icEdit = getIcon("icEdit", "Editar Compañia", true);
          e.icDelete = getIcon("icDelete", "Eliminar Compañía", true);
        });
        return data;
      })
    );
  }

  CompanyRegister(company: CompanyRequest): Observable<BaseResponse> {
    const requestUrl = `${env.apiCredentials}${endpoint.COMPANY_REGISTER}`;
    console.log("Puta Ruta: ", requestUrl);
    return this._http.post(requestUrl, company).pipe(
      map((resp: BaseResponse) => {
        return resp;
      })
    );
  }

  CompanyById(companyId: number): Observable<CompanyResponse> {
    const requestUrl = `${env.apiCredentials}${endpoint.COMPANY_BY_ID}${companyId}`;
    return this._http.get(requestUrl).pipe(
      map((resp: BaseResponse) => {
        return resp.data;
      })
    );
  }

  CompanyEdit(
    companyId: number,
    company: CompanyRequest
  ): Observable<BaseResponse> {
    const requestUrl = `${env.apiCredentials}${endpoint.COMPANY_EDIT}${companyId}`;
    return this._http.put(requestUrl, company).pipe(
      map((resp: BaseResponse) => {
        return resp;
      })
    );
  }

  CompanyRemove(companyId: number): Observable<BaseResponse> {
    const requestUrl = `${env.apiCredentials}${endpoint.COMPANY_REMOVE}${companyId}`;
    return this._http.put<BaseResponse>(requestUrl, "");
  }

  CompanyRecover(companyId: number): Observable<void> {
    const requestUrl = `${env.apiCredentials}${endpoint.COMPANY_RECOVER}${companyId}`;
    return this._http.put(requestUrl, "").pipe(
      map((resp: BaseResponse) => {
        if (resp.isSuccess) {
          this._alert.success("Excelente", resp.message);
        }
      })
    );
  }

  CountriesSelect(): Observable<string[]> {
    return this.comboSelectService.CountriesSelect();
  }

  ProvinceByCountrySelect(countryId: number): Observable<ProvinceByCountryResponse[]> {
    return this.comboSelectService.ProvincesByCountrySelect(countryId);
  }

  ProvincesByCommunitySelect(provinceId: number): Observable<ProvinceByCommunityResponse[]> {
    return this.comboSelectService.ProvincesByCommunityySelect(provinceId);
  }


}
