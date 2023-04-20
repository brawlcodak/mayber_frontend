import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlansComponent } from './plans/plans.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PayComponent } from './pay/pay.component';
import { UserPayComponent } from './user-pay/user-pay.component';
import { AdministrationComponent } from './administration/administration.component';
import { LicensesComponent } from './licenses/licenses.component';

const routes: Routes = [
  {
    path: '',
    component: PlansComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'pays',
    component: PayComponent
  },
  {
    path: 'user-pays',
    component: UserPayComponent
  },
  {
    path: 'adm/users',
    component: AdministrationComponent
  },
  {
    path: 'adm/licenses',
    component: LicensesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrivateRoutingModule { }
