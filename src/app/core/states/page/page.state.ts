import { Injectable, NgZone } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { Page } from './page.actions';
import { Router } from '@angular/router';

export class PageStateModel {

}

const defaults: PageStateModel = {

};

@State<PageStateModel>({
  name: 'page',
  defaults
})
@Injectable({
  providedIn: 'root'
})
export class PageState {
  constructor(
    private _zone: NgZone,
    private _router: Router,
  ){ }


  @Action(Page.GoTo)
  setGoTo(
    ctx: StateContext<PageStateModel>,
    action: Page.GoTo
  ): void {
    this._zone.run(() => {
      this._router.navigate([`${action.url}`]);
    });
  }
}
