import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Varios } from './varios.actions';
import { INotification } from '../../interfaces/inotification.interface';
import { EVarios } from '../../enums/varios.enum';

export class VariosStateModel {
  notification: INotification;
}

const defaults: VariosStateModel = {
  notification: {} as INotification
};

@State<VariosStateModel>({
  name: 'test',
  defaults
})
@Injectable({
  providedIn: 'root'
})
export class VariosState {
  constructor(
  ){ }

  @Selector()
  static getNotification(state: VariosStateModel): INotification {
    return state.notification;
  }


  @Action(Varios.NotificationError)
  openSnackBar(
    ctx: StateContext<VariosStateModel>,
    action: Varios.NotificationError
  ): void {
    ctx.patchState({notification: action.notification});
  }

  @Action(Varios.Default)
  default(
    ctx: StateContext<VariosStateModel>,
    action: Varios.Default
  ): void {
    switch (action.fns) {
      case EVarios.notification:
        ctx.patchState({notification: defaults.notification});
        break;
    }
  }
}
