import { FormBuilder } from '@angular/forms';
import { AppController } from './appController';
import { NgForm } from './ng-form';
import { MatDialogRef } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';

export abstract class NgDialogDefault extends NgForm {

    public hasClosed: boolean = false;
    public hasTimePicker: boolean = false;

    constructor(protected dialogRef: MatDialogRef<any>,
        protected formBuilder: FormBuilder,
        protected appController: AppController,
        protected hasKeepRegister: boolean,
        protected spinner?: NgxSpinnerService) {
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

    submit(hasSpinner: boolean = true): void { // centralizar no NgDialogDefault
        if (this._form.valid) {
            hasSpinner ? this.spinner.show() : null;
            this.close(this._form.value);
        }
    }

    public abstract setComponentState(): any;

    public showEditLoader(duration: number = 300): void {
        Promise.resolve(null).then(() => {
            this.spinner.show();
            setTimeout(() => this.spinner.hide(), duration);
        })
    }

}