import { Component, OnInit } from '@angular/core';
import { Helper } from '../core/helper/helper.component';
import { Select, Store } from '@ngxs/store';
import { Page } from '../core/states/page/page.actions';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Account } from '../core/states/account/account.actions';
import { AccountState } from '../core/states/account/account.state';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @Select(AccountState.get_ip_registered) ip$: Observable<boolean>;
  public ipRegister: boolean;
  constructor(
    private _helper: Helper,
    private store: Store,
    private _http: HttpClient,
  ) {
    this.listenObservables();
  }

  ngOnInit(): void {
    this.getPublicIP().subscribe((response) => {
      this.store.dispatch(new Account.GetBlackIp(response.ip));
    });
  }

  listenObservables() {
    this.ip$.subscribe((item) => {
      this.ipRegister = item;
    });
  }

  getPublicIP(): Observable<any> {
    return this._http.get('https://api.ipify.org/?format=json');
  }

  onRedirect(accion: string): void {
    switch (accion) {
      case 'login':
        this.store.dispatch(new Page.GoTo('login'));
        break;
      case 'register':
        this.store.dispatch(new Page.GoTo('register'));
        break;
    }
  }

}
