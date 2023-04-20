import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrivateRoutingModule } from './private-routing.module';
import { MaterialModule } from '../material/material.module';
import { PlansComponent } from './plans/plans.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ComponentModule } from '../components/components.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PayComponent } from './pay/pay.component';
import { UserPayComponent } from './user-pay/user-pay.component';
import { AdministrationComponent } from './administration/administration.component';
import { LicensesComponent } from './licenses/licenses.component';

@NgModule({
  declarations: [
    PlansComponent,
    DashboardComponent,
    PayComponent,
    UserPayComponent,
    AdministrationComponent,
    LicensesComponent
  ],
  imports: [
    CommonModule,
    PrivateRoutingModule,
    MaterialModule,
    ComponentModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class PrivateModule { }
