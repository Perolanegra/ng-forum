import { Select } from '@ngxs/store';
import { AppState } from '../shared/state/app.state';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AppController } from './appController';
import { Renderer2 } from '@angular/core';
import { NgDefault } from './pattern/ng-default';

export abstract class DialogDefault extends NgDefault {

    @Select(AppState.hasMobileMatches) stateMobileMatches$: Observable<any>;

    public hasClosed: boolean = false;
    public dialogForm: FormGroup;
    
    constructor(protected dialog: MatDialog,
        protected formBuilder: FormBuilder,
        protected renderer: Renderer2,
        protected appController: AppController) {
        super();
        this.stateMobileMatches$.subscribe(state => this.hasMobileMatches = state);
        this.dialogForm = this.formBuilder.group({});
    }


    public abstract setDialogForm();

    setCloseColor(btnCloseElement, data) {
        if(!this.hasMobileMatches && btnCloseElement) {
            this.renderer.setStyle(btnCloseElement, 'color', this.appController.getColorRef(data.type));
        }
    }

    public abstract setErrorValidation();

}