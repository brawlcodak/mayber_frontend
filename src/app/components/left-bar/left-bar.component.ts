import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { InfoInstructionsComponent } from '../info-instructions/info-instructions.component';
import { Store } from '@ngxs/store';
import { Page } from 'src/app/core/states/page/page.actions';
import { InfoErrorComponent } from '../info-error/info-error.component';

@Component({
  selector: 'app-left-bar',
  templateUrl: './left-bar.component.html',
  styleUrls: ['./left-bar.component.scss']
})
export class LeftBarComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    private store: Store
  ) { }

  ngOnInit(): void {
  }

  openInstructions() {
    const dialogRef = this.dialog.open(InfoInstructionsComponent);
  }

  openReportError() {
    const dialogRef = this.dialog.open(InfoErrorComponent, {
      width: '50%',
      height: '50%'
    });
  }

  redirect(url: string) {
    if(url.includes('shop')){
      this.store.dispatch(new Page.GoTo('private/'));
    }
  }

  openUserPayments(){
    this.store.dispatch(new Page.GoTo('private/user-pays'));
  }

  openDashboard(){
    this.store.dispatch(new Page.GoTo('private/dashboard'));
  }

  onLogout() {
    localStorage.clear();
    this.store.dispatch(new Page.GoTo(''));
  }

}
