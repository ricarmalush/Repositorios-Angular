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
import { ProvinceResponse } from '../models/province-response.interface';
import { ProvinceRequest } from '../models/province-request.interface';

@Injectable({
  providedIn: 'root'
})
export class ProvinceService {
  countries: string[]; // Declaración de la propiedad countries

  constructor(private _http: HttpClient, 
              private _alert: AlertService, 
              private comboSelectService: ComboSelectService) {}

  GetAll(size, sort, order, page, getInputs): Observable<BaseResponse> {
    const requestUrl = `${env.apiCredentials}${
      endpoint.LIST_PROVINCES
    }?records=${size}&sort=${sort}&order=${order}&numPage=${
      page + 1
    }${getInputs}`;

    return this._http.get<BaseResponse>(requestUrl).pipe(
      map((data: BaseResponse) => {
        data.data.forEach(function (e: ProvinceResponse) {
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
          e.icEdit = getIcon("icEdit", "Editar Provincia", true);
          e.icDelete = getIcon("icDelete", "Eliminar Provincia", true);
        });
        return data;
      })
    );
  }

  ProvinceRegister(province: ProvinceRequest): Observable<BaseResponse> {
    const requestUrl = `${env.apiCredentials}${endpoint.PROVINCE_REGISTER}`;
    return this._http.post(requestUrl, province).pipe(
      map((resp: BaseResponse) => {
        return resp;
      })
    );
  }

  ProvinceById(provinceId: number): Observable<ProvinceResponse> {
    const requestUrl = `${env.apiCredentials}${endpoint.PROVINCE_BY_ID}${provinceId}`;
    return this._http.get(requestUrl).pipe(
      map((resp: BaseResponse) => {
        return resp.data;
      })
    );
  }

  ProvinceEdit(
    ProvinceId: number,
    province: ProvinceRequest
  ): Observable<BaseResponse> {
    const requestUrl = `${env.apiCredentials}${endpoint.PROVINCE_EDIT}${ProvinceId}`;
    return this._http.put(requestUrl, province).pipe(
      map((resp: BaseResponse) => {
        return resp;
      })
    );
  }

  ProvinceRemove(ProvinceId: number): Observable<BaseResponse> {
    const requestUrl = `${env.apiCredentials}${endpoint.PROVINCE_REMOVE}${ProvinceId}`;
    return this._http.put<BaseResponse>(requestUrl, "");
  }


  ProvinceRecover(ProvinceId: number): Observable<void> {
    const requestUrl = `${env.apiCredentials}${endpoint.PROVINCE_RECOVER}${ProvinceId}`;
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



}
