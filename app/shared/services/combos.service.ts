import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { endpoint } from "@shared/apis/endpoint";
import { BaseResponse } from "@shared/models/base-api-response.interface";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { ProvinceByCountryResponse } from "src/app/pages/community/models/community-response.interface";
import { ProvinceByCommunityResponse } from "src/app/pages/company/models/company-response.interface";
import { environment as env } from "src/environments/environment";

@Injectable({
    providedIn: "root",
  })
  export class ComboSelectService {
    constructor(private _http: HttpClient) {}
    
  
    CountriesSelect(): Observable<string[]> {
        const requestUrl = `${env.apiCredentials}${endpoint.LIST_COUNTRIES}`;
        return this._http.get<BaseResponse>(requestUrl).pipe(
          map((response: BaseResponse) => {
            return response.data;
          })
        );
      }

      ProvinceSelect(): Observable<string[]> {
        const requestUrl = `${env.apiCredentials}${endpoint.PROVINCE_SELECT}`;
        return this._http.get<BaseResponse>(requestUrl).pipe(
          map((response: BaseResponse) => {
            return response.data;
          })
        );
      }

      ProvincesByCountrySelect(countryId: number): Observable<ProvinceByCountryResponse[]> {
        const requestUrl = `${env.apiCredentials}${endpoint.PROVINCE_BY_COUNTRY}/${countryId}`;
        return this._http.get<ProvinceByCountryResponse[]>(requestUrl);
      }

      ProvincesByCommunityySelect(provinceId: number): Observable<ProvinceByCommunityResponse[]> {
        const requestUrl = `${env.apiCredentials}${endpoint.LIST_COMMUNITY_BY_PROVINCE}/${provinceId}`;
        return this._http.get<ProvinceByCommunityResponse[]>(requestUrl);
      }

      DocumentTypeSelect(): Observable<string[]> {
        const requestUrl = `${env.apiCredentials}${endpoint.DOCUMENTYPES_SELECT}`;
        return this._http.get<BaseResponse>(requestUrl).pipe(
          map((response: BaseResponse) => {
            return response.data;
          })
        );
      }

      MenuSelect(): Observable<string[]> {
        const requestUrl = `${env.apiCredentials}${endpoint.MENUS_SELECT}`;
        return this._http.get<BaseResponse>(requestUrl).pipe(
          map((response: BaseResponse) => {
            return response.data;
          })
        );
      }

      UserSelect(): Observable<string[]> {
        const requestUrl = `${env.apiCredentials}${endpoint.USER_SELECT}`;
        return this._http.get<BaseResponse>(requestUrl).pipe(
          map((response: BaseResponse) => {
            return response.data;
          })
        );
      }

      RoleSelect(): Observable<string[]> {
        const requestUrl = `${env.apiCredentials}${endpoint.ROLES_SELECT}`;
        return this._http.get<BaseResponse>(requestUrl).pipe(
          map((response: BaseResponse) => {
            return response.data;
          })
        );
      }

      CompanySelect(): Observable<string[]> {
        const requestUrl = `${env.apiCredentials}${endpoint.COMPANY_SELECT}`;
        return this._http.get<BaseResponse>(requestUrl).pipe(
          map((response: BaseResponse) => {
            return response.data;
          })
        );
      }

      DepartmentSelect(): Observable<string[]> {
        const requestUrl = `${env.apiCredentials}${endpoint.DEPARTMENTS_SELECT}`;
        return this._http.get<BaseResponse>(requestUrl).pipe(
          map((response: BaseResponse) => {
            return response.data;
          })
        );
      }

      AccessPointSelect(): Observable<string[]> {
        const requestUrl = `${env.apiSchedule}${endpoint.LIST_SELECTACCESSPOINT}`;
        return this._http.get<BaseResponse>(requestUrl).pipe(
          map((response: BaseResponse) => {
            return response.data;
          })
        );
      }

      


    }
