import { FormBuilder } from '@angular/forms';
import { AppController } from './appController';
import { NgForm } from './ng-form';
import { MatDialogRef } from '@angular/material/dialog';

export abstract class NgDialogDefault extends NgForm {

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

    close(data?: any) {
        this.dialogRef.close(data);
        this.hasClosed = true;
    }

}