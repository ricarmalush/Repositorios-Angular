import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { endpoint } from '@shared/apis/endpoint';
import { BaseResponse } from '@shared/models/base-api-response.interface';
import { AlertService } from '@shared/services/alert.service';
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment as env } from "src/environments/environment";
import { getIcon } from '@shared/functions/helpers';
import { HolidayResponse } from '../models/holiday-response.interface';
import { HolidayRequest } from '../models/holiday-request.interface';

@Injectable({
  providedIn: 'root'
})
export class HolidayService {

  constructor(private _http: HttpClient, private _alert: AlertService) {}

  GetAll(size, sort, order, page, getInputs): Observable<BaseResponse> {
    const requestUrl = `${env.apiSchedule}${
      endpoint.LIST_HOLIDAY
    }?records=${size}&sort=${sort}&order=${order}&numPage=${
      page + 1
    }${getInputs}`;

    return this._http.get<BaseResponse>(requestUrl).pipe(
      map((data: BaseResponse) => {
        data.data.forEach(function (e: HolidayResponse) {
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
          e.icEdit = getIcon("icEdit", "Editar Días Festivos", true);
          e.icDelete = getIcon("icDelete", "Eliminar Días Festivos", true);
        });
        return data;
      })
    );
  }

  HolidayRegister(holiday: HolidayRequest): Observable<BaseResponse> {
    const requestUrl = `${env.apiSchedule}${endpoint.HOLIDAY_REGISTER}`;
    return this._http.post(requestUrl, holiday).pipe(
      map((resp: BaseResponse) => {
        return resp;
      })
    );
  }

  HolidayById(HolidayId: number): Observable<HolidayResponse> {
    const requestUrl = `${env.apiSchedule}${endpoint.HOLIDAY_BY_ID}${HolidayId}`;
    return this._http.get(requestUrl).pipe(
      map((resp: BaseResponse) => {
        return resp.data;
      })
    );
  }

  HolidayEdit(
    HolidayId: number,
    holiday: HolidayRequest
  ): Observable<BaseResponse> {
    const requestUrl = `${env.apiSchedule}${endpoint.HOLIDAY_EDIT}${HolidayId}`;
    return this._http.put(requestUrl, holiday).pipe(
      map((resp: BaseResponse) => {
        return resp;
      })
    );
  }

  HolidayRemove(holidayId: number): Observable<BaseResponse> {
    const requestUrl = `${env.apiSchedule}${endpoint.HOLIDAY_REMOVE}${holidayId}`;
    return this._http.put<BaseResponse>(requestUrl, "");
  }

  HolidayRecover(holidayId: number): Observable<void> {
    const requestUrl = `${env.apiSchedule}${endpoint.HOLIDAY_RECOVER}${holidayId}`;
    return this._http.put(requestUrl, "").pipe(
      map((resp: BaseResponse) => {
        if (resp.isSuccess) {
          this._alert.success("Excelente", resp.message);
        }
      })
    );
  }


}
