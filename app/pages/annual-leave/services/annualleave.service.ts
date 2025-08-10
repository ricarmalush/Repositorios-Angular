import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { endpoint } from '@shared/apis/endpoint';
import { BaseResponse } from '@shared/models/base-api-response.interface';
import { AlertService } from '@shared/services/alert.service';
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment as env } from "src/environments/environment";
import { getIcon } from '@shared/functions/helpers';
import { AnnualLeaveResponse } from '../models/annual-leave-response.interface';
import { AnnualLeaveRequest } from '../models/annual-leave-request.interface';
import { ComboSelectService } from '@shared/services/combos.service';

@Injectable({
  providedIn: 'root'
})
export class AnnualleaveService {
  constructor(private _http: HttpClient, private _alert: AlertService, private _comboSelectService: ComboSelectService) {}

  GetAll(size, sort, order, page, getInputs): Observable<BaseResponse> {
    const requestUrl = `${env.apiSchedule}${
      endpoint.LIST_ANNUALLEAVE
    }?records=${size}&sort=${sort}&order=${order}&numPage=${
      page + 1
    }${getInputs}`;

    return this._http.get<BaseResponse>(requestUrl).pipe(
      map((data: BaseResponse) => {
        data.data.forEach(function (e: AnnualLeaveResponse) {
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
          e.icEdit = getIcon("icEdit", "Editar días", true);
          e.icDelete = getIcon("icDelete", "Eliminar días", true);
        });
        return data;
      })
    );
  }

  AnnualLeaveRegister(annualLeaveResponse: AnnualLeaveResponse): Observable<BaseResponse> {
    const requestUrl = `${env.apiSchedule}${endpoint.ANNUALLEAVE_REGISTER}`;
    return this._http.post(requestUrl, annualLeaveResponse).pipe(
      map((resp: BaseResponse) => {
        return resp;
      })
    );
  }

  AnnualLeaveById(annualLeaveBalanceId: number): Observable<AnnualLeaveResponse> {
    const requestUrl = `${env.apiSchedule}${endpoint.ANNUALLEAVE_BY_ID}${annualLeaveBalanceId}`;
    return this._http.get(requestUrl).pipe(
      map((resp: BaseResponse) => {
        return resp.data;
      })
    );
  }

  AnnualLeaveEdit(
    annualLeaveBalanceId: number,
    annualLeaveBalance: AnnualLeaveRequest
  ): Observable<BaseResponse> {
    const requestUrl = `${env.apiSchedule}${endpoint.ANNUALLEAVE_EDIT}${annualLeaveBalanceId}`;
    return this._http.put(requestUrl, annualLeaveBalance).pipe(
      map((resp: BaseResponse) => {
        return resp;
      })
    );
  }

  AnnualLeaveRemove(annualLeaveBalanceId: number): Observable<BaseResponse> {
    const requestUrl = `${env.apiSchedule}${endpoint.ANNUALLEAVE_REMOVE}${annualLeaveBalanceId}`;
    return this._http.put<BaseResponse>(requestUrl, "");
  }

  AnnualLeaveRecover(annualLeaveBalanceId: number): Observable<void> {
    const requestUrl = `${env.apiSchedule}${endpoint.ANNUALLEAVE_RECOVER}${annualLeaveBalanceId}`;
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
