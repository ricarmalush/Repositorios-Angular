import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MapSelectResponse } from '../models/map-response.interface';
import { environment as env } from "src/environments/environment";
import { BaseResponse } from '@shared/models/base-api-response.interface';
import { endpoint } from '@shared/apis/endpoint';
import { map } from 'rxjs/internal/operators/map';
import { MapSelectRequest } from '../models/map-request.interface';
import { MapAccessPointRequest } from '../models/map-request-access-point.interface';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor(
    private _http: HttpClient) { }

    AccessPointSelect(request: MapSelectRequest): Observable<BaseResponse> {  // Cambiado a MapSelectRequest
      const requestUrl = `${env.apiSchedule}${endpoint.LIST_SELECTACCESSPOINT}`;
      return this._http.post(requestUrl, request).pipe(
        map((resp: BaseResponse) => {
          return resp;
        })
      );
    }

    AccessPoint(request: MapAccessPointRequest): Observable<BaseResponse> {  // Cambiado a MapSelectRequest
      const requestUrl = `${env.apiSchedule}${endpoint.ACCESSPOINT}`;
      return this._http.post(requestUrl, request).pipe(
        map((resp: BaseResponse) => {
          return resp;
        })
      );
    }


  }
