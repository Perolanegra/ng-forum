import { Select } from '@ngxs/store';
import { AppState } from '../shared/state/app.state';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AppController } from './appController';
import { Renderer2 } from '@angular/core';

export abstract class DialogDefault {

    @Select(AppState.hasMobileMatches) stateMobileMatches$: Observable<any>;

    public hasMobileMatches: boolean;
    public hasClosed: boolean = false;
    public dialogForm: FormGroup;
    
    constructor(protected dialog: MatDialog,
        protected formBuilder: FormBuilder,
        protected renderer: Renderer2,
        protected appController: AppController) {
        this.stateMobileMatches$.subscribe(state => this.hasMobileMatches = state);
    }

    public getStyle(trueValue, falseValue) {
        return this.hasMobileMatches ? trueValue : falseValue;
    }

    public getColorRef(data) {
        const call = {
            error: () => { return 'red' },
            info: () => { return 'blue' },
            warning: () => { return 'orange' },
            success: () => { return 'green' },
        }

        const { type } = data;
        return call[type]();
    }

    close(): void {
        this.hasClosed = true;
        this.dialog.closeAll();
    }

    public setDialogForm() {
        this.dialogForm = this.formBuilder.group({});
    }

    setCloseColor(btnCloseElement, data) {
        if(!this.hasMobileMatches) {
            this.renderer.setStyle(btnCloseElement, 'color', this.getColorRef(data));
        }
    }

}