import { NgModule } from '@angular/core';
import { AlertComponent } from './alert/alert.component';
import { LeftBarComponent } from './left-bar/left-bar.component';
import { TermsAndConditionsComponent } from './terms-and-conditions/terms-and-conditions.component';
import { MaterialModule } from '../material/material.module';
import { InfoInstructionsComponent } from './info-instructions/info-instructions.component';
import { InfoErrorComponent } from './info-error/info-error.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';
import { LeftBarAdministrationComponent } from './left-bar-administration/left-bar-administration.component';
import { TopBarComponent } from './top-bar/top-bar.component';

@NgModule({
  declarations: [
    AlertComponent,
    LeftBarComponent,
    TermsAndConditionsComponent,
    InfoInstructionsComponent,
    InfoErrorComponent,
    LeftBarAdministrationComponent,
    TopBarComponent
  ],
  imports: [
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule,
    CommonModule
  ],
  exports: [
    AlertComponent,
    LeftBarComponent,
    TermsAndConditionsComponent,
    LeftBarAdministrationComponent,
    TopBarComponent
  ]
})
export class ComponentModule { }
