import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { endpoint } from '@shared/apis/endpoint';
import { BaseResponse } from '@shared/models/base-api-response.interface';
import { AlertService } from '@shared/services/alert.service';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { environment as env } from "src/environments/environment";
import { CommunityResponse, ProvinceByCountryResponse } from '../models/community-response.interface';
import { getIcon } from '@shared/functions/helpers';
import { CommunityRequest } from '../models/community-request.interface';
import { ComboSelectService } from '@shared/services/combos.service';

@Injectable({
  providedIn: 'root'
})
export class CommunityService {

  constructor(private _http: HttpClient, 
            private _alert: AlertService,
            private comboSelectService: ComboSelectService) {}

  GetAll(size, sort, order, page, getInputs): Observable<BaseResponse> {
    const requestUrl = `${env.apiCredentials}${
      endpoint.LIST_COMMUNITIES
    }?records=${size}&sort=${sort}&order=${order}&numPage=${
      page + 1
    }${getInputs}`;

    return this._http.get<BaseResponse>(requestUrl).pipe(
      map((data: BaseResponse) => {
        data.data.forEach(function (e: CommunityResponse) {
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
          e.icEdit = getIcon("icEdit", "Editar Comunidad", true);
          e.icDelete = getIcon("icDelete", "Eliminar Comunidad", true);
        });
        return data;
      })
    );
  }

  CommunityRegister(community: CommunityRequest): Observable<BaseResponse> {
    const requestUrl = `${env.apiCredentials}${endpoint.COMMUNITY_REGISTER}`;
    return this._http.post(requestUrl, community).pipe(
      map((resp: BaseResponse) => {
        return resp;
      })
    );
  }

  CommunityById(communityId: number): Observable<CommunityResponse> {
    const requestUrl = `${env.apiCredentials}${endpoint.COMMUNITY_BY_ID}${communityId}`;
    return this._http.get(requestUrl).pipe(
      map((resp: BaseResponse) => {
        return resp.data;
      })
    );
  }

  CommunityEdit(
    CommunityId: number,
    community: CommunityRequest
  ): Observable<BaseResponse> {
    const requestUrl = `${env.apiCredentials}${endpoint.COMMUNITY_EDIT}${CommunityId}`;
    return this._http.put(requestUrl, community).pipe(
      map((resp: BaseResponse) => {
        return resp;
      })
    );
  }

  CommunityRemove(CommunityId: number): Observable<BaseResponse> {
    const requestUrl = `${env.apiCredentials}${endpoint.COMMUNITY_REMOVE}${CommunityId}`;
    return this._http.put<BaseResponse>(requestUrl, "");
  }

  CommunityRecover(CommunityId: number): Observable<void> {
    const requestUrl = `${env.apiCredentials}${endpoint.COMMUNITY_RECOVER}${CommunityId}`;
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


}


