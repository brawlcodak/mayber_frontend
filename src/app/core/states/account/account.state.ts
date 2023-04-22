import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Account } from './account.actions';
import { Observable, tap } from 'rxjs';
import { IApiResponse } from '../../models/api-response.model';
import { ILicense, ILicenseType } from '../../interfaces/ilicense.interface';
import { AccountService } from '../../services/account.service';
import { Varios } from '../varios/varios.actions';
import { Page } from '../page/page.actions';
import { IPayPayload } from '../../interfaces/ipay.interface';

export class AccountStateModel {
  licenses_types: ILicenseType[];
  license: ILicense;
  license_for_pay: ILicenseType;
  pay_reports: IPayPayload[];
  pays_user: IPayPayload[];
  ipregistered: boolean;
}

const defaults: AccountStateModel = {
  licenses_types: [],
  pay_reports: [],
  license: {} as ILicense,
  license_for_pay: {} as ILicenseType,
  pays_user: [],
  ipregistered: undefined
};

@State<AccountStateModel>({
  name: 'account',
  defaults
})
@Injectable({
  providedIn: 'root'
})
export class AccountState {
  constructor(
    private _accountService: AccountService
  ){ }

  @Selector()
  static get_licenses_types(state: AccountStateModel): ILicenseType[] {
    return state.licenses_types;
  }
  @Selector()
  static get_license(state: AccountStateModel): ILicense {
    return state.license;
  }
  @Selector()
  static get_license_for_pay(state: AccountStateModel): ILicenseType {
    return state.license_for_pay;
  }
  @Selector()
  static get_license_for_pay_by_user(state: AccountStateModel): IPayPayload[] {
    return state.pays_user;
  }
  @Selector()
  static get_pay_reports(state: AccountStateModel): IPayPayload[] {
    return state.pay_reports;
  }
  @Selector()
  static get_ip_registered(state: AccountStateModel): boolean {
    return state.ipregistered;
  }


  @Action(Account.AddBlackList)
  add_blacl_list(
    ctx: StateContext<AccountStateModel>,
    action: Account.AddBlackList
  ): Observable<IApiResponse<any>> {
    return this._accountService.add_black_list(action.ip).pipe(
      tap((success) => {

      }, (error) => {
        console.log(error)
      })
    )
  }

  @Action(Account.ResponseReportPay)
  response_pay_report(
    ctx: StateContext<AccountStateModel>,
    action: Account.ResponseReportPay
  ): Observable<IApiResponse<any>> {
    return this._accountService.response_report_pay(action.data).pipe(
      tap((success) => {
        ctx.dispatch(new Account.GetAllPayReports());
        ctx.dispatch(new Varios.NotificationError({
          text: "Se respondio el reporte de pago exitosamente!",
          error: false,
          seconds: 4,
          show: true
        }));
      }, (error) => {
        console.log(error)
      })
    )
  }

  @Action(Account.GetBlackIp)
  get_ip_black(
    ctx: StateContext<AccountStateModel>,
    action: Account.GetBlackIp
  ): Observable<IApiResponse<any>> {
    return this._accountService.black_ips(action.ip).pipe(
      tap((success) => {
        ctx.patchState({ipregistered: success.data});
      }, (error) => {
        console.log(error)
      })
    )
  }

  @Action(Account.GetLicensesType)
  get_licenses_types(
    ctx: StateContext<AccountStateModel>,
    action: Account.GetLicensesType
  ): Observable<IApiResponse<ILicenseType[]>> {
    return this._accountService.get_licenses_type().pipe(
      tap((success) => {
        if (success.data) {
          ctx.patchState({licenses_types: success.data});
        }
      }, (error) => {
        console.log(error)
      })
    )
  }

  @Action(Account.GetLicensesTypeByUser)
  get_license_by_user(
    ctx: StateContext<AccountStateModel>,
    action: Account.GetLicensesTypeByUser
  ): Observable<IApiResponse<ILicense>> {
    return this._accountService.get_licenses_by_user(action.user_id).pipe(
      tap((success) => {
        if (success.data) {
          ctx.patchState({license: success.data});
        }
      }, (error) => {
        console.log(error)
      })
    )
  }

  @Action(Account.GetAllPayReports)
  get_all_apy_reports(
    ctx: StateContext<AccountStateModel>,
    action: Account.GetAllPayReports
  ): Observable<IApiResponse<IPayPayload[]>> {
    return this._accountService.get_pay_reports().pipe(
      tap((success) => {
        if (success.data) {
          ctx.patchState({pay_reports: success.data});
        }
      }, (error) => {
        console.log(error)
      })
    )
  }

  @Action(Account.AddLicense)
  add_license(
    ctx: StateContext<AccountStateModel>,
    action: Account.AddLicense
  ): Observable<IApiResponse<any>> {
    return this._accountService.add_license(action.license).pipe(
      tap((success) => {
        ctx.dispatch(new Varios.NotificationError({
          text: `Cuenta actualizada, sigue disfrutando de Mayber`,
          error: false,
          show: true,
          seconds: 5
        }));
      }, (error) => {
        ctx.dispatch(new Varios.NotificationError({
          text: `Error al adquirir nueva licencia`,
          error: true,
          show: true,
          seconds: 5
        }));
        console.log(error)
      })
    )
  }

  @Action(Account.AddFreeLicense)
  add_free_license(
    ctx: StateContext<AccountStateModel>,
    action: Account.AddFreeLicense
  ): Observable<IApiResponse<any>> {
    return this._accountService.add_free_license(action.license).pipe(
      tap((success) => {
        if (success.data) {
          ctx.dispatch(new Varios.NotificationError({
            text: `Inició su prueba grtuita por 3 dias`,
            error: false,
            show: true,
            seconds: 5
          }));
        }
        ctx.dispatch(new Page.GoTo('private/dashboard'));
      }, (error) => {
        ctx.dispatch(new Varios.NotificationError({
          text: `No se pudo iniciar la prueba gratuita`,
          error: true,
          show: true,
          seconds: 5
        }));
        console.log(error)
      })
    )
  }

  @Action(Account.UpdateLicense)
  update_license(
    ctx: StateContext<AccountStateModel>,
    action: Account.UpdateLicense
  ): Observable<IApiResponse<any>> {
    return this._accountService.update_license(action.license).pipe(
      tap((success) => {
        if (success.data) {
          ctx.dispatch(new Varios.NotificationError({
            text: `Cuenta actualizada, sigue disfrutando de Mayber`,
            error: false,
            show: true,
            seconds: 5
          }));
        }
      }, (error) => {
        ctx.dispatch(new Varios.NotificationError({
          text: `No se pudo actualizar su cuenta`,
          error: true,
          show: true,
          seconds: 5
        }));
        console.log(error)
      })
    )
  }

  @Action(Account.LicenseForPay)
  license_for_pay(
    ctx: StateContext<AccountStateModel>,
    action: Account.LicenseForPay
  ): void {
    ctx.patchState({license_for_pay: action.license});
  }

  @Action(Account.AddPayReport)
  add_pay_report(
    ctx: StateContext<AccountStateModel>,
    action: Account.AddPayReport
  ): Observable<IApiResponse<ILicenseType[]>> {
    return this._accountService.add_pay_report(action.payload).pipe(
      tap((success) => {
        if (!success.data.error){
          ctx.dispatch(new Varios.NotificationError({
            text: "Se envió el pago exitosamente. Ahora debes esperar a que el sistema valide su pago Nequi",
            error: false,
            seconds: 6,
            show: true
          }));
        }
      }, (error) => {
        console.log(error)
      })
    )
  }


  @Action(Account.GetAllPayReportsByUser)
  get_pays_by_user(
    ctx: StateContext<AccountStateModel>,
    action: Account.GetAllPayReportsByUser
  ): Observable<IApiResponse<IPayPayload[]>> {
    return this._accountService.get_pay_reports_byUser(action.user_id).pipe(
      tap((success) => {
        if (success){
          ctx.patchState({pays_user: success.data});
        }
      }, (error) => {
        console.log(error)
      })
    )
  }
}
