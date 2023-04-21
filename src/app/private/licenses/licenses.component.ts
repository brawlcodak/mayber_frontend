import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { IUser, IUsersResponses } from 'src/app/core/interfaces/iuser.interface';
import { UserState } from 'src/app/core/states/user/user.state';
import { Select, Store } from '@ngxs/store';
import { AccountState } from 'src/app/core/states/account/account.state';
import { IPayPayload } from 'src/app/core/interfaces/ipay.interface';
import { Account } from 'src/app/core/states/account/account.actions';
import { ILicense } from 'src/app/core/interfaces/ilicense.interface';

@Component({
  selector: 'app-licenses',
  templateUrl: './licenses.component.html',
  styleUrls: ['./licenses.component.scss']
})
export class LicensesComponent implements OnInit {
  @Select(UserState.get_user) user$: Observable<IUser>;
  @Select(AccountState.get_pay_reports) all_reports$: Observable<IPayPayload[]>;
  private subscription: Subscription = new Subscription();
  public user: IUser;
  public pays: IPayPayload[] = [];
  constructor(
    private store: Store
  ) {
    this.store.dispatch(new Account.GetAllPayReports());
    this.listenObservables();
   }

  ngOnInit(): void {
  }

  listenObservables() {
    this.subscription.add(
      this.user$.subscribe((user) =>{
        if(user && user.id) {
          this.user = user;
        }
      }));
    this.subscription.add(
      this.all_reports$.subscribe((pay) =>{
        if(pay) {
          this.pays = pay;
        }
      }));
  }

  onAcceptedPay(data: IPayPayload) {
    if(data) {
      const send_data: ILicense = {
        license_type_id: data.license_name == 'Básico' ? 2 : data.license_name == 'Platino' ? 3 : 4,
        user_id: data.user_id
      }
      this.store.dispatch(new Account.AddLicense(send_data)).toPromise()
      .finally(() => {
        const send_response: IPayPayload = {
          id: data.id,
          email: data.email,
          license_name: data.license_name,
          price: data.price,
          user_id: data.user_id,
          user_number: data.user_number,
          username_nequi: data.username_nequi,
          accepted: true
        }
        this.store.dispatch(new Account.ResponseReportPay(send_response));
      })
    }
  }

}

