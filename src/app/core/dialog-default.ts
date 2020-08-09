import { FormBuilder } from '@angular/forms';
import { AppController } from './appController';
import { NgForm } from './ng-form';
import { HostListener } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

export abstract class DialogDefault extends NgForm {

    public hasClosed: boolean = false;
    public hasTimePicker: boolean = false;

    constructor(protected dialogRef: MatDialogRef<any>,
        protected formBuilder: FormBuilder,
        protected appController: AppController,
        protected hasKeepRegister: boolean) {
        super(formBuilder, appController, hasKeepRegister);
    }

    setCloseColor(btnCloseElement, data) {
        if (!this.hasMobileMatches && btnCloseElement) {
            this.appController.setElementStyle(btnCloseElement, 'color', this.appController.getColorRef(data.type));
        }
    }

    @HostListener('window:keyup.esc') onKeyUp() {
        !this.hasTimePicker ? this.close() : null;
    }

    close(data?: any) {
        this.dialogRef.close(data);
        this.hasClosed = true;
    }

}