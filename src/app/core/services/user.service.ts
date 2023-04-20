import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlSettings } from '../settings/urls.settings';
import { IReportError } from '../interfaces/ireport_error.interface';
import { IApiResponse } from '../models/api-response.model';
import { Observable } from 'rxjs';
import { IUser, IUsersResponses } from '../interfaces/iuser.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private _http: HttpClient,
    private _appsettings: UrlSettings
  ) { }

  public report_error(data: IReportError): Observable<IApiResponse<any[]>> {
    return this._http.post<IApiResponse<any[]>>(`${this._appsettings.auth.login.url.send_report_error}`, data);
  }
  public consult_token(token: string): Observable<IApiResponse<boolean>> {
    const data = {token: token}
    return this._http.post<IApiResponse<boolean>>(`${this._appsettings.auth.login.url.consult_token}`, data);
  }
  public get_all_users(): Observable<IApiResponse<IUsersResponses[]>> {
    return this._http.get<IApiResponse<IUsersResponses[]>>(`${this._appsettings.auth.login.url.allusers}`);
  }
}
