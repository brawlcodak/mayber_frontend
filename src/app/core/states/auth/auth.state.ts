import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { Auth } from './auth.actions';
import { AuthService } from '../../services/auth.service';
import { Observable, tap } from 'rxjs';
import { IApiResponse } from '../../models/api-response.model';
import { Varios } from '../varios/varios.actions';
import { INotification } from '../../interfaces/inotification.interface';
import { IUser } from '../../interfaces/iuser.interface';
import { Helper } from '../../helper/helper.component';
import { User } from '../user/user.actions';
import { Page } from '../page/page.actions';

export class AuthStateModel {

}

const defaults: AuthStateModel = {

};

@State<AuthStateModel>({
  name: 'auth',
  defaults
})
@Injectable({
  providedIn: 'root'
})
export class AuthState {
  constructor(
    private _authService: AuthService,
    private _helper: Helper
  ){ }


  @Action(Auth.Login)
  login(
    ctx: StateContext<AuthStateModel>,
    action: Auth.Login
  ): Observable<IApiResponse<any>> {
    return this._authService.login(action.user).pipe(
      tap((success) => {
        this._helper.setLocalStorage("token", success.data.bearer);
        this._helper.setLocalStorage("user", success.data.user);
        ctx.dispatch(new User.SetUser(success.data.user));
      }, err => {
        if (err) {
          const errNotification: INotification = {
            error: true,
            seconds: 4,
            show: true,
            text: "Usuario o Contraseña Incorrectos"
          }
          ctx.dispatch(new Varios.NotificationError(errNotification));
        }
      })
    )
  }

  @Action(Auth.Register)
  register(
    ctx: StateContext<AuthStateModel>,
    action: Auth.Register
  ): Observable<IApiResponse<IUser>> {
    return this._authService.register(action.user).pipe(
      tap((success) => {
        this._helper.setLocalStorage("user",success.data);
        ctx.dispatch(new Page.GoTo('login'));
      }, err => {
        if (err) {
          const errNotification: INotification = {
            error: true,
            seconds: 4,
            show: true,
            text: "El email ya existe."
          }
          ctx.dispatch(new Varios.NotificationError(errNotification));
        }
      })
    )
  }
}
