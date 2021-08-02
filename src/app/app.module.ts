import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material/material.module';
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
import { NgxsDataPluginModule } from '@ngxs-labs/data';
import { NGXS_DATA_STORAGE_PLUGIN } from '@ngxs-labs/data/storage';
import { AuthState } from './state/auth/auth.state';
import { environment } from 'src/environments/environment';
import { HttpConfigInterceptor } from './core/http-config.interpcetor';
import { ToastrModule } from 'ngx-toastr';
import { AppState } from './state/app/app.state';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { NgxSpinnerModule } from "ngx-spinner";
import { AppMenuOverDirective } from './core/app-menu-over.directive';
import { AppAutofillOffDirective } from './shared/directives/app-autofill-off.directive';
import { AppNavNameBehaviorDirective } from './core/app-nav-name-behavior.directive';
import { ServiceWorkerModule } from '@angular/service-worker';
import { ForgetPasswordComponent } from './modules/login/dialogs/forget-password/forget-password.component';

import { FormsModule } from '@angular/forms';
import { ChatModule } from './modules/chat/chat.module';
import { GlobalVars } from './core/globalVars';
import { NgxsSelectSnapshotModule } from '@ngxs-labs/select-snapshot';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainNavComponent,
    AppMenuOverDirective,
    AppAutofillOffDirective,
    AppNavNameBehaviorDirective,
    ForgetPasswordComponent,
    // TesteComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    ChatModule,
    BrowserAnimationsModule,
    MaterialModule,
    SharedModule,
    HttpClientModule,
    LayoutModule,
    ToastrModule.forRoot(),
    NgxsModule.forRoot([AuthState, AppState], { developmentMode: !environment.production, selectorOptions: {
      suppressErrors: false, injectContainerState: false
    } }),
    NgxsStoragePluginModule.forRoot({
      key: ['auth.token', 'auth.notAuth', 'auth.hasResetPass', 'app.hasMobileMatches', 'app.routes', 'auth.user'],
    }),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot(),
    NgxsDataPluginModule.forRoot([NGXS_DATA_STORAGE_PLUGIN]),
    NgxsSelectSnapshotModule.forRoot(),
    NgxSpinnerModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
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
    JwtHelperService,
    GlobalVars,
  ],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
  ],
  entryComponents: [
    ForgetPasswordComponent
  ]
})
export class AppModule { }
