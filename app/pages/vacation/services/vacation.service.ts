import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { endpoint } from '@shared/apis/endpoint';
import { BaseResponse } from '@shared/models/base-api-response.interface';
import { AlertService } from '@shared/services/alert.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment as env } from "src/environments/environment";
import { VacationResponse } from '../models/vacation-response.interface';
import { getIcon } from '@shared/functions/helpers';
import { VacationRequest } from '../models/vacation-request.interface';
import { ComboSelectService } from '@shared/services/combos.service';

@Injectable({
  providedIn: 'root'
})
export class VacationService {

  constructor(private _http: HttpClient, private _alert: AlertService,private _comboSelectService: ComboSelectService) {}

  GetAll(size, sort, order, page, getInputs): Observable<BaseResponse> {
    const requestUrl = `${env.apiSchedule}${
      endpoint.LIST_VACATION
    }?records=${size}&sort=${sort}&order=${order}&numPage=${
      page + 1
    }${getInputs}`;

    return this._http.get<BaseResponse>(requestUrl).pipe(
      map((data: BaseResponse) => {
        data.data.forEach(function (e: VacationResponse) {
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
          e.icEdit = getIcon("icEdit", "Editar Días vacaciones", true);
          e.icDelete = getIcon("icDelete", "Eliminar Días vacaciones", true);
        });
        return data;
      })
    );
  }

  VacationRegister(vacation: VacationRequest): Observable<BaseResponse> {
    const requestUrl = `${env.apiSchedule}${endpoint.VACATION_REGISTER}`;
    return this._http.post(requestUrl, vacation).pipe(
      map((resp: BaseResponse) => {
        return resp;
      })
    );
  }

  VacationById(vacationId: number): Observable<VacationResponse> {
    const requestUrl = `${env.apiSchedule}${endpoint.VACATION_BY_ID}${vacationId}`;
    return this._http.get(requestUrl).pipe(
      map((resp: BaseResponse) => {
        return resp.data;
      })
    );
  }

  VacationEdit(
    vacationId: number,
    vacation: VacationRequest
  ): Observable<BaseResponse> {
    const requestUrl = `${env.apiSchedule}${endpoint.VACATION_EDIT}${vacationId}`;
    return this._http.put(requestUrl, vacation).pipe(
      map((resp: BaseResponse) => {
        return resp;
      })
    );
  }

  VacationRemove(vacationId: number): Observable<BaseResponse> {
    const requestUrl = `${env.apiSchedule}${endpoint.VACATION_REMOVE}${vacationId}`;
    return this._http.put<BaseResponse>(requestUrl, "");
  }

  VacationRecover(vacationId: number): Observable<void> {
    const requestUrl = `${env.apiSchedule}${endpoint.VACATION_RECOVER}${vacationId}`;
    return this._http.put(requestUrl, "").pipe(
      map((resp: BaseResponse) => {
        if (resp.isSuccess) {
          this._alert.success("Excelente", resp.message);
        }
      })
    );
  }

  UserSelect(): Observable<string[]> {
    return this._comboSelectService.UserSelect();
  }

}
