import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { endpoint } from '@shared/apis/endpoint';
import { getIcon } from '@shared/functions/helpers';
import { BaseResponse } from '@shared/models/base-api-response.interface';
import { AlertService } from '@shared/services/alert.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment as env } from "src/environments/environment";
import { DocumentTypeRequest } from '../models/documentType-request.interface';
import { DocumentTypeResponse } from '../models/documentType-response.interface';

@Injectable({
  providedIn: 'root'
})
export class DocumentTypeService {

  constructor(private _http: HttpClient, private _alert: AlertService) {}

  GetAll(size, sort, order, page, getInputs): Observable<BaseResponse> {
    const requestUrl = `${env.apiCredentials}${
      endpoint.LIST_DOCUMENTYPES
    }?records=${size}&sort=${sort}&order=${order}&numPage=${
      page + 1
    }${getInputs}`;

    return this._http.get<BaseResponse>(requestUrl).pipe(
      map((data: BaseResponse) => {
        data.data.forEach(function (e: DocumentTypeResponse) {
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
          e.icEdit = getIcon("icEdit", "Editar documento", true);
          e.icDelete = getIcon("icDelete", "Eliminar documento", true);
        });
        return data;
      })
    );
  }

  DocumentTypeRegister(documentType: DocumentTypeRequest): Observable<BaseResponse> {
    const requestUrl = `${env.apiCredentials}${endpoint.DOCUMENTYPE_REGISTER}`;
    return this._http.post(requestUrl, documentType).pipe(
      map((resp: BaseResponse) => {
        return resp;
      })
    );
  }

  DocumentTypeById(documentTypeId: number): Observable<DocumentTypeResponse> {
    const requestUrl = `${env.apiCredentials}${endpoint.DOCUMENTYPE_BY_ID}${documentTypeId}`;
    return this._http.get(requestUrl).pipe(
      map((resp: BaseResponse) => {
        return resp.data;
      })
    );
  }

  DocumentTypeEdit(
    documentTypeId: number,
    documentType: DocumentTypeRequest
  ): Observable<BaseResponse> {
    const requestUrl = `${env.apiCredentials}${endpoint.DOCUMENTYPE_EDIT}${documentTypeId}`;
    return this._http.put(requestUrl, documentType).pipe(
      map((resp: BaseResponse) => {
        return resp;
      })
    );
  }

  DocumentTypeRemove(documentTypeId: number): Observable<BaseResponse> {
    const requestUrl = `${env.apiCredentials}${endpoint.DOCUMENTYPE_REMOVE}${documentTypeId}`;
    return this._http.put<BaseResponse>(requestUrl, "");
  }

  DocumentTypeRecover(documentTypeId: number): Observable<void> {
    const requestUrl = `${env.apiCredentials}${endpoint.DOCUMENTYPE_RECOVER}${documentTypeId}`;
    return this._http.put(requestUrl, "").pipe(
      map((resp: BaseResponse) => {
        if (resp.isSuccess) {
          this._alert.success("Excelente", resp.message);
        }
      })
    );
  }


}