import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/modules/material.module';
import { SharedModule } from './shared/shared.module';
import { LoginComponent } from './modules/login/login.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LayoutModule } from '@angular/cdk/layout';
import { MainNavComponent } from './modules/main-nav/main-nav.component';
import { AppController } from './core/appController';
import { MainNavStyle } from './modules/main-nav/main-nav.style';
import { NgxsModule } from '@ngxs/store';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin'
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { AuthState } from './state/auth/auth.state';
import { environment } from 'src/environments/environment';
import { HttpConfigInterceptor } from './core/http-config.interpcetor';
import { ToastrModule } from 'ngx-toastr';
import { AppState } from './shared/state/app.state';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { NgxSpinnerModule } from "ngx-spinner";
import { AppMenuOverDirective } from './core/app-menu-over.directive';
import { AppAutofillOffDirective } from './shared/directives/app-autofill-off.directive';
import { AppNavNameBehaviorDirective } from './core/app-nav-name-behavior.directive';
import { ServiceWorkerModule } from '@angular/service-worker';
import { ForgetPasswordComponent } from './modules/login/dialogs/forget-password/forget-password.component';
import { TesteComponent } from './modules/teste/teste.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainNavComponent,
    AppMenuOverDirective,
    AppAutofillOffDirective,
    AppNavNameBehaviorDirective,
    ForgetPasswordComponent,
    TesteComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    SharedModule,
    HttpClientModule,
    LayoutModule,
    ToastrModule.forRoot(),
    NgxsModule.forRoot([AuthState, AppState]), // , { developmentMode: !environment.production }
    NgxsStoragePluginModule.forRoot({
      key: ['auth.token', 'auth.notAuth', 'auth.hasResetPass', 'app.hasMobileMatches', 'app.routes', 'app.user'],
    }),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot(),
    NgxSpinnerModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
    // JwtModule.forRoot({
    //   config: {
        // tokenGetter: () => localStorage.getItem("meutoken"),
        // whitelistedDomains: ["example.com"],
        // blacklistedRoutes: ["http://example.com/examplebadroute/"],
      // },
    // }),
  ],
  exports: [
    MaterialModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt' },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpConfigInterceptor,
      multi: true
    },
    AppController,
    MainNavStyle,
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService
  ],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  entryComponents: [
    ForgetPasswordComponent
  ]
})
export class AppModule { }
