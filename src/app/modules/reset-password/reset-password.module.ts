import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from 'src/app/shared/modules/material.module';
import { ResetPasswordComponent } from './reset-password.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ResetPasswordRoutingModule } from './reset-password-routing.module';


@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        RouterModule,
        SharedModule,
        ReactiveFormsModule,
        ResetPasswordRoutingModule
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ],
    declarations: [
        ResetPasswordComponent,
    ],
  
    providers: [
    ]
})
export class ResetPasswordModule { }
