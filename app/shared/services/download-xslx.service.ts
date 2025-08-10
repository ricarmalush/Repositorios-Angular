import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment as env } from "./../../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class DownloadXslxService {
  constructor(private http: HttpClient) {}

  executeDownload(url: string): Observable<Blob> {
    return this.http.get<Blob>(`${env.apiCredentials}${url}`, {
      responseType: "blob" as "json",
    });
  }

  executeDownloadSchledule(url: string): Observable<Blob> {
    return this.http.get<Blob>(`${env.apiSchedule}${url}`, {
      responseType: "blob" as "json",
    });
  }
}
