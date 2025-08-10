import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { endpoint } from "@shared/apis/endpoint";
import { BaseResponse } from "@shared/models/base-api-response.interface";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment as env } from "src/environments/environment";
import { ManualSigningResponse } from "../models/manual-signing-response.interface";
import { getIcon } from "@shared/functions/helpers";
import { ManualSigningRequest } from "../models/manual-signing-request.interface";
import { ProvinceByCommunityResponse } from "../../company/models/company-response.interface";
import { ComboSelectService } from "@shared/services/combos.service";

@Injectable({
  providedIn: "root",
})
export class ManualSigningService {
  constructor(
    private _http: HttpClient,
    private comboSelectService: ComboSelectService
  ) {}

  GetAll(size, sort, order, page, getInputs): Observable<BaseResponse> {
    const requestUrl = `${env.apiSchedule}${
      endpoint.LIST_MANUALSIGNING
    }?records=${size}&sort=${sort}&order=${order}&numPage=${
      page + 1
    }${getInputs}`;

    return this._http.get<BaseResponse>(requestUrl).pipe(
      map((data: BaseResponse) => {
        data.data.forEach(function (e: ManualSigningResponse) {
          switch (e.type) {
            case "Inicio de Jornada":
              e.badgeColor = "text-black bg-green";
              break;
            case "Salida para Almorzar":
              e.badgeColor = "text-white bg-primary";
              break;
            case "Regreso de Almorzar":
              e.badgeColor = "text-black bg-green";
              break;
            case "Salida para Comida":
              e.badgeColor = "text-white bg-primary";
              break;
              case "Regreso de Comida":
                e.badgeColor = "text-black bg-green";
              break;
              case "Final de Jornada":
                e.badgeColor = "text-white bg-red";
              break;
            default:
              e.badgeColor = "text-gray bg-gray-light";
              break;
          }
          e.icEdit = getIcon("icEdit", "Editar Fichaje", true);
          e.icDelete = getIcon("icDelete", "Eliminar Fichaje", true);
        });
        return data;
      })
    );
  }

  SigningRegister(signing: ManualSigningResponse): Observable<BaseResponse> {
    const requestUrl = `${env.apiSchedule}${endpoint.MANUALSIGNING_REGISTER}`;
    return this._http.post(requestUrl, signing).pipe(
      map((resp: BaseResponse) => {
        return resp;
      })
    );
  }

  SigningById(signingUpId: number): Observable<ManualSigningResponse> {
    const requestUrl = `${env.apiSchedule}${endpoint.MANUALSIGNING_BY_ID}${signingUpId}`;
    return this._http.get(requestUrl).pipe(
      map((resp: BaseResponse) => {
        return resp.data;
      })
    );
  }

  SigningEdit(
    signingUpId: number,
    signingUp: ManualSigningRequest
  ): Observable<BaseResponse> {
    const requestUrl = `${env.apiSchedule}${endpoint.MANUALSIGNING_EDIT}${signingUpId}`;
    return this._http.put(requestUrl, signingUp).pipe(
      map((resp: BaseResponse) => {
        return resp;
      })
    );
  }

  SigningRemove(signingUpId: number): Observable<BaseResponse> {
    const requestUrl = `${env.apiSchedule}${endpoint.MANUALSIGNING_REMOVE}${signingUpId}`;
    return this._http.put<BaseResponse>(requestUrl, "");
  }

  ProvincesByCommunitySelect(provinceId: number): Observable<ProvinceByCommunityResponse[]> {
    return this.comboSelectService.ProvincesByCommunityySelect(provinceId);
  }

  
}
