import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ILicense, ILicenseType } from 'src/app/core/interfaces/ilicense.interface';
import { IUser } from 'src/app/core/interfaces/iuser.interface';
import { Account } from 'src/app/core/states/account/account.actions';
import { AccountState } from 'src/app/core/states/account/account.state';
import { Page } from 'src/app/core/states/page/page.actions';
import { UserState } from 'src/app/core/states/user/user.state';

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.scss']
})
export class PlansComponent implements OnInit {
  @Select(UserState.get_user) user$: Observable<IUser>;
  @Select(AccountState.get_license) license$: Observable<ILicense>;
  @Select(AccountState.get_licenses_types) license_types$: Observable<ILicenseType[]>;
  private user: IUser;
  public licenses_types: ILicenseType[] = [];
  public gray_free = "";
  public gray_basic = "";
  public gray_platin = "";
  public gray_premium = "";
  public license = false;
  constructor(
    private store: Store
  ) {
    setTimeout(() => {
      this.license = true;
    }, 1500);
    this.listenObservables();
    this.store.dispatch(new Account.GetLicensesType);
  }

  ngOnInit(): void {
  }

  listenObservables(): void {
    this.user$.subscribe((item) => {
      this.user = item;
      this.store.dispatch(new Account.GetLicensesTypeByUser(item.id));
    });
    this.license$.subscribe((item) => {
      if(item && item.id) {
        this.gray_free = "gray";
      switch (item.license_type_id) {
        case 2:
          this.gray_basic = "gray";
          break;
        case 3:
          this.gray_platin = "gray";
          break;
        case 4:
          this.gray_premium = "gray";
          break;
      }
      }
    });
    this.license_types$.subscribe((licences) => {
      this.licenses_types = licences
    })
  }

  send_pays() {
    this.store.dispatch(new Page.GoTo('private/user-pays'));
  }

  onAddFree() {
    const data: ILicense = {
      license_type_id: 1,
      user_id: this.user.id,
    }
    this.store.dispatch(new Account.AddFreeLicense(data));
  }

  onPay(license_type_id: number) {
    const index = this.licenses_types.findIndex(f => f.id === license_type_id );
    this.store.dispatch(new Account.LicenseForPay(this.licenses_types[index])).toPromise()
    .finally(() => {
      this.store.dispatch(new Page.GoTo('private/pays'));
    })

  }

  onDashboard() {
    this.store.dispatch(new Page.GoTo('private/dashboard'));
  }

}
