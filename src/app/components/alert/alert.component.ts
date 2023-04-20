import { Component, Input, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { EVarios } from 'src/app/core/enums/varios.enum';
import { INotification } from 'src/app/core/interfaces/inotification.interface';
import { Varios } from 'src/app/core/states/varios/varios.actions';
import { VariosState } from 'src/app/core/states/varios/varios.state';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {
  @Select(VariosState.getNotification) notification$: Observable<INotification>;
  private subscription: Subscription = new Subscription();
  public text: string;
  public seconds: number;
  public active: string;
  public show = false;
  public error = false;
  constructor(
    private store: Store
  ) {
    this.listenObservables();
   }

  ngOnInit(): void {

  }

  listenObservables(): void {
    this.notification$.subscribe((notification: INotification) => {
      this.active = 'active';
      this.show = notification.show;
      this.text = notification.text;
      this.error = notification.error;
      setTimeout(() => {
        this.active = "";
        setTimeout(() => {
          this.store.dispatch(new Varios.Default(EVarios.notification));
        }, (1000));
      }, notification.seconds*1000);
    })
  }

}
