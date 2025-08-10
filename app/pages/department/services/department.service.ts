import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { endpoint } from '@shared/apis/endpoint';
import { getIcon } from '@shared/functions/helpers';
import { BaseResponse } from '@shared/models/base-api-response.interface';
import { AlertService } from '@shared/services/alert.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment as env } from "src/environments/environment";
import { DepartmentResponse } from '../models/department-response.interface';
import { DepartmentRequest } from '../models/department-request.interface';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(private _http: HttpClient, private _alert: AlertService) {}

  GetAll(size, sort, order, page, getInputs): Observable<BaseResponse> {
    const requestUrl = `${env.apiCredentials}${
      endpoint.LIST_DEPARTMENT
    }?records=${size}&sort=${sort}&order=${order}&numPage=${
      page + 1
    }${getInputs}`;

    return this._http.get<BaseResponse>(requestUrl).pipe(
      map((data: BaseResponse) => {
        data.data.forEach(function (e: DepartmentResponse) {
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
          e.icEdit = getIcon("icEdit", "Editar departamento", true);
          e.icDelete = getIcon("icDelete", "Eliminar departamento", true);
        });
        return data;
      })
    );
  }

  DepartmentRegister(department: DepartmentRequest): Observable<BaseResponse> {
    const requestUrl = `${env.apiCredentials}${endpoint.DEPARTMENT_REGISTER}`;
    return this._http.post(requestUrl, department).pipe(
      map((resp: BaseResponse) => {
        return resp;
      })
    );
  }

  DepartmentById(departmentId: number): Observable<DepartmentResponse> {
    const requestUrl = `${env.apiCredentials}${endpoint.DEPARTMENT_BY_ID}${departmentId}`;
    return this._http.get(requestUrl).pipe(
      map((resp: BaseResponse) => {
        return resp.data;
      })
    );
  }

  DepartmentEdit(
    departmentId: number,
    department: DepartmentRequest
  ): Observable<BaseResponse> {
    const requestUrl = `${env.apiCredentials}${endpoint.DEPARTMENT_EDIT}${departmentId}`;
    return this._http.put(requestUrl, department).pipe(
      map((resp: BaseResponse) => {
        return resp;
      })
    );
  }

  DepartmentRemove(departmentId: number): Observable<BaseResponse> {
    const requestUrl = `${env.apiCredentials}${endpoint.DEPARTMENT_REMOVE}${departmentId}`;
    return this._http.put<BaseResponse>(requestUrl, "");
  }

  DocumentTypeRecover(departmentId: number): Observable<void> {
    const requestUrl = `${env.apiCredentials}${endpoint.DEPARTMENT_RECOVER}${departmentId}`;
    return this._http.put(requestUrl, "").pipe(
      map((resp: BaseResponse) => {
        if (resp.isSuccess) {
          this._alert.success("Excelente", resp.message);
        }
      })
    );
  }


}