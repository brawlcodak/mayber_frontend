import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlSettings } from '../settings/urls.settings';
import { ILogin, IUser } from '../interfaces/iuser.interface';
import { Observable } from 'rxjs';
import { IApiResponse } from '../models/api-response.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private _http: HttpClient,
    private _appSettings: UrlSettings
  ) { }

  public login(data: ILogin): Observable<IApiResponse<any[]>> {
    return this._http.post<IApiResponse<any[]>>(`${this._appSettings.auth.login.url.base}`, data);
  }
  public register(data: IUser): Observable<IApiResponse<IUser>> {
    return this._http.post<IApiResponse<IUser>>(`${this._appSettings.auth.login.url.register}`, data);
  }
}
