import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ILogin, IUser } from '../core/interfaces/iuser.interface';
import { Helper } from '../core/helper/helper.component';
import { Select, Store } from '@ngxs/store';
import { Auth } from '../core/states/auth/auth.actions';
import { Observable, Subscription } from 'rxjs';
import { AccountState } from '../core/states/account/account.state';
import { ILicense } from '../core/interfaces/ilicense.interface';
import { Page } from '../core/states/page/page.actions';
import { User } from '../core/states/user/user.actions';
import { UserState } from '../core/states/user/user.state';
import { Account } from '../core/states/account/account.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @Select(UserState.get_user) user$: Observable<IUser>;
  @Select(AccountState.get_license) license$: Observable<ILicense>;
  private subscription: Subscription = new Subscription();
  public loginForm: FormGroup;
  private users: IUser;
  public showAlert = false;
  public textAlert = "";
  public license: ILicense;
  constructor(
    private _formBuilder: FormBuilder,
    private _helper: Helper,
    private store: Store
  ) {
    this.createForm();
    this.listenObservables();
  }

  ngOnInit(): void {
  }

  listenObservables() {
    this.user$.subscribe((item) => {
      if(item && item.id){
        this.users = item;
        this.store.dispatch(new Account.GetLicensesTypeByUser(item.id));
      }
    })
    this.license$.subscribe((item) => {
      if(item && item.id) {
        this.license = item;
      }

      if (this.users){
        if(this.license){
          if (!this.license.expire){
            this.store.dispatch(new Page.GoTo('private/dashboard'));
          }else{
            this.store.dispatch(new Page.GoTo('private'));
          }
        }else{
          this.store.dispatch(new Page.GoTo('private'));
        }
      }else{
        this.store.dispatch(new Page.GoTo('login'));
      }
    });
  }

  createForm() {
    this.loginForm = this._formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }

  onLogin() :void {
    this.showAlert = true;
    const dataLogin: ILogin = this.loginForm.getRawValue();
    if(dataLogin.password && dataLogin.username){
      this.store.dispatch(new Auth.Login(dataLogin)).toPromise().finally(() => {
        this.showAlert = false
        if (this.users) {
          if (this.license){
            this.store.dispatch(new Page.GoTo('private/dashboard'));
          }else{
            this.store.dispatch(new Page.GoTo('private'));
          }
        }
      });
    }
  }

}
