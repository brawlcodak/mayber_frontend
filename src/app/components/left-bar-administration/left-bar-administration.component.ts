import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Page } from 'src/app/core/states/page/page.actions';

@Component({
  selector: 'app-left-bar-administration',
  templateUrl: './left-bar-administration.component.html',
  styleUrls: ['./left-bar-administration.component.scss']
})
export class LeftBarAdministrationComponent implements OnInit {
  public url: string
  constructor(
    private router: Router,
    private store: Store,
  ) {
    this.url = this.router.url;
  }

  ngOnInit(): void {
  }

  redirect(url: string) {
    this.store.dispatch(new Page.GoTo(url));
  }

}
