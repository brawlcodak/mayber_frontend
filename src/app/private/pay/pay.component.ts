import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { ILicenseType } from 'src/app/core/interfaces/ilicense.interface';
import { IPayPayload } from 'src/app/core/interfaces/ipay.interface';
import { IUser } from 'src/app/core/interfaces/iuser.interface';
import { Account } from 'src/app/core/states/account/account.actions';
import { AccountState } from 'src/app/core/states/account/account.state';
import { Page } from 'src/app/core/states/page/page.actions';
import { User } from 'src/app/core/states/user/user.actions';
import { UserState } from 'src/app/core/states/user/user.state';
import { Varios } from 'src/app/core/states/varios/varios.actions';

@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.scss']
})
export class PayComponent implements OnInit {
  @Select(AccountState.get_license_for_pay) license_for_pay$: Observable<ILicenseType>;
  @Select(UserState.get_user) user$: Observable<IUser>;
  public license: ILicenseType;
  public user: IUser;
  public form: FormGroup;
  private subscriptions: Subscription = new Subscription();
  constructor(
    private store: Store,
    private _formBuilder: FormBuilder
  ) {
    this.createForm();
    this.listenObservables();
  }

  ngOnInit(): void {
  }

  listenObservables() {
    this.subscriptions.add(
      this.license_for_pay$.subscribe((license) => {
        if (license && license.id){
          this.license = license;
          this.form.get('price').setValue(this.license?.id == 2 ? '$30.000 COP' : this.license?.id == 3 ? '$50.000 COP' : '$250.000 COP');
        }
      })
    );

    this.subscriptions.add(
      this.user$.subscribe((user) => {
        if(user && user.id){
          this.form.patchValue({
            email: user.email
          })
          this.user = user;
        }
      })
    );
  }

  createForm() {
    this.form = this._formBuilder.group({
      id: 0,
      email: '',
      user_number: '',
      price: '',
      username_nequi: '',
    });
  }

  onPayReport() {
    const data = this.form.getRawValue();
    if (!data.user_number){
      this.store.dispatch(new Varios.NotificationError({
        text: "El campo 'Número de telefono celular Nequi', es obligatorio",
        error: true,
        seconds: 3,
        show: true
      }));
    }else if(!data.username_nequi) {
      this.store.dispatch(new Varios.NotificationError({
        text: "El campo 'Nombre tal y como aparece usted en Nequi', es obligatorio",
        error: true,
        seconds: 3,
        show: true
      }));
    }else{
      const data_payload: IPayPayload = {
        user_id: this.user.id,
        email: this.user.email,
        price: this.form.get('price').value,
        user_number: this.form.get('user_number').value,
        username_nequi: this.form.get('username_nequi').value,
        license_name: this.license.name
      }
      this.store.dispatch(new Account.AddPayReport(data_payload)).toPromise()
      .finally(() => {
        this.store.dispatch(new Page.GoTo('private/user-pays'));
      })
    }
  }

  onCancel() {
    this.store.dispatch(new Page.GoTo('private/'))
  }

}
