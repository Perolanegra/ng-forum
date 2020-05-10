import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from './modules/material.module';
import { FormComponent } from './components/form/form.component';
import { ToastComponent } from './components/toast/toast.component';
import { AppOverBtnDirective } from '../core/app-over-btn.directive';
import { NgInputErrorComponent } from './components/ng-input-error/ng-input-error.component';

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
        AppOverBtnDirective,
        NgInputErrorComponent
    ],
    exports: [
        FormComponent,
        NgInputErrorComponent,
        MaterialModule,
        ReactiveFormsModule,
    ],
    entryComponents: [
        ToastComponent,
    ],
    providers: [
        
    ]
})
export class SharedModule { }
