import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { User } from './user.actions';
import { UserService } from '../../services/user.service';
import { Observable, Observer, tap } from 'rxjs';
import { Varios } from '../varios/varios.actions';
import { IApiResponse } from '../../models/api-response.model';
import { IUser, IUsersResponses } from '../../interfaces/iuser.interface';
import { Page } from '../page/page.actions';

export class UserStateModel {
  user: IUser;
  isValidtoken = true;
  allUsers: IUsersResponses[];
}

const defaults: UserStateModel = {
  user: {} as IUser,
  isValidtoken: false,
  allUsers: []
};

@State<UserStateModel>({
  name: 'user',
  defaults
})
@Injectable({
  providedIn: 'root'
})
export class UserState {
  constructor(
    private _user_service: UserService
  ){ }

  @Selector()
  static get_user (state: UserStateModel): IUser {
    return state.user
  }

  @Selector()
  static get_is_token_valid (state: UserStateModel): boolean {
    return state.isValidtoken
  }

  @Selector()
  static get_All_users (state: UserStateModel): IUsersResponses[] {
    return state.allUsers
  }


  @Action(User.ReportError)
  report_error(
    ctx: StateContext<UserStateModel>,
    action: User.ReportError
  ): Observable<IApiResponse<any>> {
    return this._user_service.report_error(action.data).pipe(
      tap((success) => {
        ctx.dispatch(new Varios.NotificationError({
          error: false,
          seconds: 3,
          show: true,
          text: "Reporte enviado con exito. Será revisado por nuestros administradores inmediatamente."
        }));
      }, (err)=> {
        ctx.dispatch(new Varios.NotificationError({
          error: true,
          seconds: 3,
          show: true,
          text: "Error al enviar el reporte. Por favor, envialo de nuevo"
        }));
      })
    )
  }

  @Action(User.SetUser)
  set_user(
    ctx: StateContext<UserStateModel>,
    action: User.SetUser
  ): void {
    ctx.patchState({user: action.user});
  }

  @Action(User.ConsultToken)
  consult_token(
    ctx: StateContext<UserStateModel>,
    action: User.ConsultToken
  ): Observable<IApiResponse<boolean>> {
    return this._user_service.consult_token(action.token).pipe(
      tap((success) => {
        if (!success.data['error']) {
          ctx.patchState({isValidtoken: true});
        }else{

        }
      }, (err) => {
        ctx.patchState({isValidtoken: false});
          localStorage.clear();
          ctx.dispatch(new Page.GoTo('login'));
          ctx.dispatch(new Varios.NotificationError({
            text: "Inicia Sesión de nuevo",
            error: true,
            seconds: 4,
            show: true
          }));
      })
    )
  }

  @Action(User.GetAllUsers)
  get_all_users(
    ctx: StateContext<UserStateModel>,
    action: User.GetAllUsers
  ): Observable<IApiResponse<IUsersResponses[]>> {
    return this._user_service.get_all_users().pipe(
      tap((success) => {
        if (success.data) {
          ctx.patchState({allUsers: success.data});
        }
      }, (err) => {
      })
    )
  }
}
