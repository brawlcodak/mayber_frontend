import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { IUser, IUsersResponses } from 'src/app/core/interfaces/iuser.interface';
import { User } from 'src/app/core/states/user/user.actions';
import { UserState } from 'src/app/core/states/user/user.state';

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.scss']
})
export class AdministrationComponent implements OnInit {
  @Select(UserState.get_user) user$: Observable<IUser>;
  @Select(UserState.get_All_users) all_user$: Observable<IUsersResponses[]>;
  private subscription: Subscription = new Subscription();
  public picker;
  public pickerto;
  public user: IUser;
  public users: IUsersResponses[] = [];
  public usersAux: IUsersResponses[] = [];
  constructor(
    private store: Store
  ) {
    this.listenObservables();
    this.store.dispatch(new User.GetAllUsers());
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
      this.all_user$.subscribe((user) =>{
        if(user) {
          this.users = user;
        }
      }));
  }

}
