import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { Name } from './test.actions';

export class TestStateModel {

}

const defaults: TestStateModel = {

};

@State<TestStateModel>({
  name: 'test',
  defaults
})
@Injectable({
  providedIn: 'root'
})
export class TestState {
  constructor(
  ){ }


  @Action(Name.Test)
  openSnackBar(
    ctx: StateContext<TestStateModel>,
    action: Name.Test
  ): void {
    ///
  }
}
