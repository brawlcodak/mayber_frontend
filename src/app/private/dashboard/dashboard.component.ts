import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { EColors } from 'src/app/core/enums/colors.enum';
import { EInfoResults } from 'src/app/core/enums/info-results.enum';
import { Helper } from 'src/app/core/helper/helper.component';
import { ILicense } from 'src/app/core/interfaces/ilicense.interface';
import { IUser } from 'src/app/core/interfaces/iuser.interface';
import { Account } from 'src/app/core/states/account/account.actions';
import { AccountState } from 'src/app/core/states/account/account.state';
import { Page } from 'src/app/core/states/page/page.actions';
import { UserState } from 'src/app/core/states/user/user.state';
import { Varios } from 'src/app/core/states/varios/varios.actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  @Select(UserState.get_user) user$: Observable<IUser>;
  @Select(AccountState.get_license) licence$: Observable<ILicense>;
  public licence: ILicense;
  private subscription: Subscription = new Subscription();
  public enable_percents = false;
  public enable_purples = false;
  public enable_pinks = false;
  public enable_max = false;
  public text_information: string = EInfoResults.getting;
  public count_blue = 0;
  public count_purple = 0;
  public count_pink = 0;
  public records: string[] = [];
  //value percents ...
  private long_predictions: number[] = [];
  private short_predictions: number[] = [];
  public percent_principal: number;
  public color_principal: string;
  public percent_blue = 0;
  public percent_purple = 0;
  public percent_pink = 0;
  //value process ....
  private steps_counter = 0;
  public steps_records: number[] = [];
  private roof: number[] = [];
  private floor: number[] = [];
  private pink_counter = 0;
  private pink_porcent = 0;
  constructor(
    private _helper: Helper,
    private store: Store
  ) {
    this.listenObservables();
   }

  async ngOnInit(): Promise<void> {
    const enable_all_toggle = await this._helper.getStoragePromise("enableToggles");
    if(enable_all_toggle) {
      this.enable_percents = true;
      this.enable_purples = true;
      this.enable_pinks = true;
      this.enable_max = true;
    }

    if(this.licence.expire){
      this.store.dispatch(new Varios.NotificationError({
        text: "Tu licencia se ha vencido",
        error: true,
        seconds: 4,
        show: true
      }));
      this.store.dispatch(new Page.GoTo("private"));
    }
  }

  listenObservables() {
    this.subscription.add(
      this.user$.subscribe(
        (user) => {
          if (user && user.id) {
            this.store.dispatch(new Account.GetLicensesTypeByUser(user.id));
          }
        }
      )
    );
    this.subscription.add(
      this.licence$.subscribe((license) => {
        if(license) {
          this.licence = license;
        }
      })
    )
  }

  public onEnableAll(e: any): void {
    if (e.checked){
      this.enable_percents = true;
      this.enable_purples = true;
      this.enable_pinks = true;
      this.enable_max = true;
      this._helper.setLocalStorage("enableToggles", true);
    }else{
      this.enable_percents = false;
      this.enable_purples = false;
      this.enable_pinks = false;
      this.enable_max = false;
    }
  }

  public addCoef(c: string): void {
    switch (c) {
      case "blue":
        this.records.push(EColors.blue);
        this.count_blue = this.count_blue + 1;
        this.steps_counter = this.steps_counter - 1;
        this.steps_records.push(this.steps_counter);
        this.pink_counter = this.pink_counter + 1;
        this.pink_porcent = this.pink_porcent + 2;
        break;
      case "purple":
        this.records.push(EColors.purple);
        this.count_purple = this.count_purple + 1;
        this.steps_counter = this.steps_counter + 1;
        this.steps_records.push(this.steps_counter);
        this.pink_counter = this.pink_counter + 1;
        this.pink_porcent = this.pink_porcent + 2;
        break;
      case "pink":
        this.records.push(EColors.pink);
        this.count_pink = this.count_pink + 1;
        this.steps_counter = this.steps_counter + 1;
        this.steps_records.push(this.steps_counter);
        this.pink_counter = 0;
        this.pink_porcent = 0;
        break;
      case "erase":
        if (this.records){
          if(this.records[this.records.length-1].includes(EColors.pink)){
            this.pink_counter = 0;
          }
          this.records.splice(this.records.length-1, 1);
        }
        if (this.steps_records){
          this.steps_records.splice(this.steps_records.length-1, 1);
          this.steps_counter = this.steps_records[this.steps_records.length-1];
        }
        break;
    }
    this.steps_records.length < 30 ? this.text_information = `${EInfoResults.getting} ${this.steps_records.length}/30` : this.analyze();
  }

  analyze(): void {
    this.percent_blue = 0;
    this.percent_purple = 0;
    this.percent_pink = 0;
    this.percent_principal = 0;
    this.color_principal = undefined;
    this.text_information = EInfoResults.analyzing;
    this.steps_records.length > 35 ? this.clearList() : '';

    // process roof and floor //

    this.floor.push(Math.min(...this.steps_records));
    this.roof.push(Math.max(...this.steps_records));

    this.long_predictions.length >= 2 ? this.long_predictions = [] : '';
    this.short_predictions.length >= 2 ? this.short_predictions = [] : '';

    if (this.floor[this.floor.length-2] > this.floor[this.floor.length-1]){
      this.text_information = EInfoResults.changing_to_down;
      this.pink_porcent = this.pink_porcent + 10;
      this.long_predictions = [];
      this.short_predictions = [];
    }else if (this.roof[this.roof.length-2] < this.roof[this.roof.length-1] ){
      this.text_information = EInfoResults.changing_to_up;
      this.pink_porcent = this.pink_porcent + 15;
      this.long_predictions = [];
      this.short_predictions = [];
    }else if (this.floor[this.floor.length-2] < this.floor[this.floor.length-1]) {
      this.text_information = EInfoResults.maybe_pink;
      this.pink_porcent = this.pink_porcent + 10;
    }else if (this.roof[this.floor.length-3] == this.steps_counter &&
      this.roof[this.roof.length-1]  > this.steps_counter){
      this.text_information = EInfoResults.prediction;
      this.color_principal = EColors.purple;
      this.percent_principal = 60;
      this.percent_blue = 20;
      this.percent_purple = 60;
      this.percent_pink = 20;
      this.long_predictions.push(this.roof[this.roof.length-1]);
    }else if (this.floor[this.floor.length-1] == this.steps_counter && this.long_predictions.length <= 2 &&
        this.floor[this.floor.length-1] == this.floor[this.floor.length-2]) {
      this.text_information = EInfoResults.prediction;
      this.color_principal = EColors.purple;
      this.percent_principal = 80;
      this.percent_blue = 19;
      this.percent_purple = 80;
      this.percent_pink = 1;
      this.long_predictions.push(this.floor[this.floor.length-1]);
    }else if (this.steps_records[this.steps_records.length-1] == this.steps_records[this.steps_records.length-3] &&
              this.steps_records[this.steps_records.length-3] < this.steps_records[this.steps_records.length-4] &&
              this.steps_records[this.steps_records.length-1] < this.steps_records[this.steps_records.length-2]
              && this.short_predictions.length <= 2){
      this.text_information = EInfoResults.prediction;
      this.color_principal = EColors.purple;
      this.percent_principal = 58;
      this.percent_blue = 22;
      this.percent_purple = 58;
      this.percent_pink = 10;
      this.long_predictions.push(1);
    }

    if(this.pink_counter > 6) {
      if(this.percent_pink > 30){
        this.text_information = EInfoResults.maybe_pink;
      }else if (this.pink_counter > 10 && (this.count_pink + this.count_purple) > this.count_blue) {
        this.text_information = EInfoResults.maybe_pink;
      }
      this.text_information = EInfoResults.maybe_pink;
      if(this.pink_counter >= 32 && this.percent_pink > 60){
        this.text_information = EInfoResults.prediction;
        this.color_principal = EColors.pink;
        this.percent_principal = 40;
        this.percent_blue = 40;
        this.percent_purple = 20;
        this.percent_pink = 40;
      }
    }
  }

  private clearList(): void {
    this.steps_records.splice(0,1);
    this.steps_counter = this.steps_records[this.steps_records.length-1];
    this.roof.splice(0,1);
    this.floor.splice(0,1);
  }

}
