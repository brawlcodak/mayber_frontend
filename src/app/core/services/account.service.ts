import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlSettings } from '../settings/urls.settings';
import { Observable } from 'rxjs';
import { IApiResponse } from '../models/api-response.model';
import { ILicense, ILicenseType } from '../interfaces/ilicense.interface';
import { IPayPayload } from '../interfaces/ipay.interface';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private _http: HttpClient,
    private _appSettings: UrlSettings
  ) { }

  public get_licenses_type(): Observable<IApiResponse<ILicenseType[]>> {
    return this._http.get<IApiResponse<ILicenseType[]>>(`${this._appSettings.account.url.license_types}`);
  }
  public get_licenses_by_user(user_id: number): Observable<IApiResponse<ILicense>> {
    return this._http.get<IApiResponse<ILicense>>(`${this._appSettings.account.url.licenses_by_user}/${user_id}`);
  }
  public add_license(data: ILicense): Observable<IApiResponse<any>> {
    delete data.id;
    return this._http.post<IApiResponse<any>>(`${this._appSettings.account.url.add_license}`, data);
  }
  public add_free_license(data: ILicense): Observable<IApiResponse<any>> {
    delete data.id;
    return this._http.post<IApiResponse<any>>(`${this._appSettings.account.url.add_free_license}`, data);
  }
  public update_license(data: ILicense): Observable<IApiResponse<any>> {
    return this._http.put<IApiResponse<any>>(`${this._appSettings.account.url.update_license}`, data);
  }

  public add_pay_report(data: IPayPayload): Observable<IApiResponse<any>> {
    return this._http.post<IApiResponse<any>>(`${this._appSettings.account.url.pay_report}`, data);
  }
  public get_pay_reports(): Observable<IApiResponse<IPayPayload[]>> {
    return this._http.get<IApiResponse<IPayPayload[]>>(`${this._appSettings.account.url.pay_report}`);
  }
  public get_pay_reports_byUser(user_id: number): Observable<IApiResponse<IPayPayload[]>> {
    return this._http.get<IApiResponse<IPayPayload[]>>(`${this._appSettings.account.url.pay_report}/${user_id}`);
  }
  public add_black_list(ip: string): Observable<IApiResponse<any>> {
    const data = {ip: ip};
    return this._http.post<IApiResponse<any>>(`${this._appSettings.account.url.black_list}`, data);
  }
  public response_report_pay(data: IPayPayload): Observable<IApiResponse<any>> {
    return this._http.post<IApiResponse<any>>(`${this._appSettings.account.url.pay_report_response}`, data);
  }
  public black_ips(ip: string): Observable<IApiResponse<any>> {
    return this._http.get<IApiResponse<any>>(`${this._appSettings.account.url.black_ips}/${ip}`);
  }
}
