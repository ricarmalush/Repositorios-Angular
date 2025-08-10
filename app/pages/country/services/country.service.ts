import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { endpoint } from '@shared/apis/endpoint';
import { BaseResponse } from '@shared/models/base-api-response.interface';
import { AlertService } from '@shared/services/alert.service';
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment as env } from "src/environments/environment";
import { getIcon } from '@shared/functions/helpers';
import { CountryResponse } from '../models/country-response.interface';
import { CountryRequest } from '../models/country-request.interface';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(private _http: HttpClient, private _alert: AlertService) {}

  GetAll(size, sort, order, page, getInputs): Observable<BaseResponse> {
    const requestUrl = `${env.apiCredentials}${
      endpoint.LIST_COUNTRIES
    }?records=${size}&sort=${sort}&order=${order}&numPage=${
      page + 1
    }${getInputs}`;

    return this._http.get<BaseResponse>(requestUrl).pipe(
      map((data: BaseResponse) => {
        data.data.forEach(function (e: CountryResponse) {
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
          e.icEdit = getIcon("icEdit", "Editar País", true);
          e.icDelete = getIcon("icDelete", "Eliminar País", true);
        });
        return data;
      })
    );
  }

  CountryRegister(country: CountryRequest): Observable<BaseResponse> {
    const requestUrl = `${env.apiCredentials}${endpoint.COUNTRY_REGISTER}`;
    return this._http.post(requestUrl, country).pipe(
      map((resp: BaseResponse) => {
        return resp;
      })
    );
  }

  CountryById(CountryId: number): Observable<CountryResponse> {
    const requestUrl = `${env.apiCredentials}${endpoint.COUNTRY_BY_ID}${CountryId}`;
    return this._http.get(requestUrl).pipe(
      map((resp: BaseResponse) => {
        return resp.data;
      })
    );
  }

  CountryEdit(
    CountryId: number,
    country: CountryRequest
  ): Observable<BaseResponse> {
    const requestUrl = `${env.apiCredentials}${endpoint.COUNTRY_EDIT}${CountryId}`;
    return this._http.put(requestUrl, country).pipe(
      map((resp: BaseResponse) => {
        return resp;
      })
    );
  }

  CountryRemove(countryId: number): Observable<BaseResponse> {
    const requestUrl = `${env.apiCredentials}${endpoint.COUNTRY_REMOVE}${countryId}`;
    return this._http.put<BaseResponse>(requestUrl, "");
  }

  CountryRecover(CountryId: number): Observable<void> {
    const requestUrl = `${env.apiCredentials}${endpoint.COUNTRY_RECOVER}${CountryId}`;
    return this._http.put(requestUrl, "").pipe(
      map((resp: BaseResponse) => {
        if (resp.isSuccess) {
          this._alert.success("Excelente", resp.message);
        }
      })
    );
  }


}
