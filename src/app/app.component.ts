import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Helper } from './core/helper/helper.component';
import { User } from './core/states/user/user.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private _store: Store,
    private _helper: Helper
  ) {
    this.init();
  }

  ngOnInit(): void {
  }

  async init() {
    const user = await this._helper.getStoragePromise('user');
    user ? this._store.dispatch(new User.SetUser(user)) : '';
  }

}
