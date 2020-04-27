import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/modules/material.module';
import { SharedModule } from './shared/shared.module';
import { LoginComponent } from './modules/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { LayoutModule } from '@angular/cdk/layout';
import { MainNavComponent } from './modules/main-nav/main-nav.component';
import { AppMenuOverDirective } from './core/app-menu-over.directive';
import { AppAutofillOffDirective } from './shared/directives/app-autofill-off.directive';
import { AppController } from './core/appController';
import { MainNavStyle } from './modules/main-nav/main-nav.style';
import { AppNavNameBehaviorDirective } from './core/app-nav-name-behavior.directive';
import { NgxsModule } from '@ngxs/store';

import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { AuthState } from './state/auth/auth.state';
import { environment } from 'src/environments/environment';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainNavComponent,
    AppMenuOverDirective,
    AppAutofillOffDirective,
    AppNavNameBehaviorDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    SharedModule,
    HttpClientModule,
    LayoutModule,
    NgxsModule.forRoot([
      AuthState
    ],{
      developmentMode: !environment.production,
    }),
    // NgxsStoragePluginModule.forRoot({
    //   key: ['auth.token ', 'auth.refreshToken', 'auth.user.username', 'auth.user.email']
    // }),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot(),
  ],
  exports: [
    MaterialModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt' },
    AppController,
    MainNavStyle
  ],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AppModule { }
