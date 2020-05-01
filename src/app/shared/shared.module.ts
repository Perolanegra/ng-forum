import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from './modules/material.module';
import { FormComponent } from './components/form/form.component';
import { GlobalVars } from '../core/globalVars';
import { ToastComponent } from './components/toast/toast.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';


@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        RouterModule,
        ReactiveFormsModule,
        // MatAutocompleteModule,
        // NgxMaskModule.forRoot(),
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ],
    declarations: [
        FormComponent,
        ToastComponent,
        ResetPasswordComponent
    ],
    exports: [
        FormComponent,
        MaterialModule,
        ReactiveFormsModule,
    ],
    entryComponents: [
        ToastComponent,
        ResetPasswordComponent
    ],
    providers: [
        GlobalVars
    ]
})
export class SharedModule { }
