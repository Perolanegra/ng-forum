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
import { MainNavComponent } from './shared/components/main-nav/main-nav.component';
import { AppMenuOverDirective } from './core/app-menu-over.directive';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainNavComponent,
    AppMenuOverDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    SharedModule,
    HttpClientModule,
    LayoutModule,
  ],
  exports: [
    MaterialModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt' }
  ],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AppModule { }
