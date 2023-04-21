import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { InfoErrorComponent } from 'src/app/components/info-error/info-error.component';
import { IPayPayload } from 'src/app/core/interfaces/ipay.interface';
import { Account } from 'src/app/core/states/account/account.actions';
import { AccountState } from 'src/app/core/states/account/account.state';
import { Page } from 'src/app/core/states/page/page.actions';
import { UserState } from 'src/app/core/states/user/user.state';

@Component({
  selector: 'app-user-pay',
  templateUrl: './user-pay.component.html',
  styleUrls: ['./user-pay.component.scss']
})
export class UserPayComponent implements OnInit {
  @Select(AccountState.get_license_for_pay_by_user) pays$: Observable<IPayPayload[]>;
  private subscriptions: Subscription = new Subscription();
  public pays: IPayPayload[] = [];
  constructor(
    private store: Store,
    public dialog: MatDialog,
  ) {
    this.store.dispatch(new Account.GetAllPayReportsByUser(this.store.selectSnapshot(UserState.get_user).id));
    this.listenObservables();
  }

  ngOnInit(): void {
  }

  listenObservables() {
    this.subscriptions.add(
      this.pays$.subscribe((item) => {
        if(item.length){
          this.pays = item;
        }
      })
    )
  }

  redirect(accion: string) {
    switch(accion) {
      case 'logout':
        localStorage.clear();
        this.store.dispatch(new Page.GoTo('login'));
        break;
      case 'report-problem':
        const dialogRef = this.dialog.open(InfoErrorComponent, {
          width: '50%',
          height: '50%'
        })
        break;
    }
  }
}
