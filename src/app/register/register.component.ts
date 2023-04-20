import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IUser } from '../core/interfaces/iuser.interface';
import { MatDialog } from '@angular/material/dialog';
import { TermsAndConditionsComponent } from '../components/terms-and-conditions/terms-and-conditions.component';
import { HttpClient } from '@angular/common/http';
import { Select, Store } from '@ngxs/store';
import { Varios } from '../core/states/varios/varios.actions';
import { Auth } from '../core/states/auth/auth.actions';
import { Observable } from 'rxjs';
import { Account } from '../core/states/account/account.actions';
import { AccountState } from '../core/states/account/account.state';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  @Select(AccountState.get_ip_registered) ip$: Observable<boolean>;
  public ipRe: boolean;
  public registerForm: FormGroup;
  public showAlert = false;
  public textAlert = "";
  public tym = false;
  public noKid = false;
  public ipRegister: string;
  constructor(
    private _formBuilder: FormBuilder,
    public dialog: MatDialog,
    private _http: HttpClient,
    private store: Store
  ) {
    this.listenObservables();
    this.createForm();
   }

  ngOnInit(): void {
    this.getPublicIP().subscribe((response) => {
      this.ipRegister = response.ip;
      this.store.dispatch(new Account.GetBlackIp(response.ip));
    });
  }

  listenObservables() {
    this.ip$.subscribe((item) => {
      this.ipRe = item;
    });
  }

  getPublicIP(): Observable<any> {
    return this._http.get('https://api.ipify.org/?format=json');
  }

  createForm() {
    this.registerForm = this._formBuilder.group({
      id: 0,
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      "re-password": ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }

  onRegister(): void {
    const newUser: IUser = this.registerForm.getRawValue();
    if (newUser['re-password'] == newUser.password) {
      if(this.tym && this.noKid){
        delete newUser['re-password'];
        if(!this.ipRe) {
          this.store.dispatch(new  Auth.Register(newUser)).toPromise()
        .finally(() => {
          this.store.dispatch(new Account.AddBlackList(this.ipRegister));
        });
        }
      }else{
        this.store.dispatch(new Varios.NotificationError({
          error: true,
          seconds: 4,
          show: true,
          text: "Debes aceptar los terminos y condiciones"
        }));
      }
    }else{
      this.store.dispatch(new Varios.NotificationError({
        error: true,
        seconds: 4,
        show: true,
        text: "Las contraseñas no coinciden"
      }));
    }

  }

  openTyC(): void {
    this.dialog.open(TermsAndConditionsComponent);
  }
}
