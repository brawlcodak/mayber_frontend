import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RegisterComponent } from './register/register.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDialogModule} from '@angular/material/dialog';
import { NgxsModule } from '@ngxs/store';
import { environment } from 'src/environments/environment';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { UrlSettings } from './core/settings/urls.settings';
import { InterceptorService } from './core/services/interceptor.service';
import { AuthState } from './core/states/auth/auth.state';
import { VariosState } from './core/states/varios/varios.state';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { ComponentModule } from './components/components.module';
import { PageState } from './core/states/page/page.state';
import { UserState } from './core/states/user/user.state';
import { AccountState } from './core/states/account/account.state';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatDialogModule,
    ComponentModule,
    NgxsModule.forRoot([
      AuthState,
      VariosState,
      PageState,
      UserState,
      AccountState
    ], {
      developmentMode: !environment.production
    }),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    MatProgressSpinnerModule
  ],
  providers: [UrlSettings,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
  }
],
  bootstrap: [AppComponent]
})
export class AppModule { }
