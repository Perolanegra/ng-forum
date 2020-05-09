import { FormGroup, FormBuilder, FormControl, AbstractControl, ValidationErrors } from "@angular/forms";
import { AppController } from './appController';
import { NgDefault } from './pattern/ng-default';
import { NgFormErrorMesssage } from './pattern/ng-form-error-msg';
import { NgFormErrorType } from './pattern/ng-form-error-type';
import { Subscription } from 'rxjs';
import { ToastComponent } from '../shared/components/toast/toast.component';
import { NgZone } from '@angular/core';


export abstract class NgForm extends NgDefault {

    _form: FormGroup;
    public errorMsgs: { [key: string]: any };
    public hide1 = true;
    public hide2 = true;
    public hasClickedSubmit: boolean = false;
    public responseSubscription$: Subscription;

    constructor(protected formBuilder: FormBuilder,
        protected appController: AppController,
        protected ngZone: NgZone,
        protected hasKeepRegister: boolean) {

        super();
        this._form = this.formBuilder.group({});
        hasKeepRegister ? this._form.addControl("keepRegister", new FormControl(false)) : null;
    }

    public abstract setForm(): void;

    public abstract getResponse(): any;

    public isValidForm(): boolean {
        this.hasClickSubmit = this._form.valid;
        return this._form.valid;
    }

    public seErrorMsgs(control: string, types: string[], msgs: string[]): void {
        const payload = this.setErrorValidation(control, types, msgs);
        this.errorMsgs[control] = payload[control];
    }

    public setErrorValidation(control: string, types: string[], msgs: string[]) {
        let errorResponse: any = {};
        errorResponse[control] = new Array<any>();

        types.map((type, key) => {
            errorResponse[control].push({ type: type, msg: msgs[key] });
        });

        return errorResponse;
    }

    /**
     * 
     * @param id index da string no array, caso for recuperar uma mensagem específica ou todas. Caso for remover, é o index do elemento inicial a ser removido.
     * @param hasDelete booleano q decide se remove os elementos do array para retornar os elementos solicitados.
     * @param removeIndex index até o qual serão removidos os elementos.
     */
    public getErrorMessages(id: number, hasDelete?: boolean, removeIndex?: number): Array<any> {
        try {
            const ngFormMsgObj = new NgFormErrorMesssage();
            const msgs = ngFormMsgObj.getMessages();

            if (!hasDelete) {
                if (id < 0) return [...msgs];
                return [msgs[id]];
            }

            removeIndex === -1 ? msgs.splice(id, msgs.length) : msgs.splice(id, removeIndex);

            return msgs;

        } catch (error) {
            console.log('Erro recuperando msgs Validation: ', error);
        }
    }

    /**
    * 
    * @param id index da string no array, caso for recuperar uma tipo específico ou todos. Caso for remover, é o index do elemento inicial a ser removido.
    * @param hasDelete booleano q decide se remove os elementos do array para retornar os elementos solicitados.
    * @param removeIndex index até o qual serão removidos os elementos.
    */
    public getErrorTypes(id: number, hasDelete?: boolean, removeIndex?: number): Array<any> {
        try {
            const ngFormTypeObj = new NgFormErrorType();
            const types = ngFormTypeObj.getTypes();

            if (!hasDelete) {
                if (id < 0) return [...types];
                return [types[id]];
            }

            removeIndex === -1 ? types.splice(id, types.length) : types.splice(id, removeIndex);

            return types;

        } catch (error) {
            console.log('Erro recuperando types Validation: ', error);
        }
    }

    public setControlValid(control: string): boolean {
        this._form.controls[control].markAsTouched({ onlySelf: true });
        return this._form.controls[control].valid;
    }

    public setFormValid(): boolean {

        this._form.markAsTouched({ onlySelf: true });
        Object.keys(this._form.controls).forEach(key => {
            this._form.controls[key].markAsTouched({ onlySelf: true });
        });

        return this._form.valid;
    }

    public matchValues(pControl: FormControl): ValidationErrors {
        if (this._form) {
            if (pControl.value?.length >= 8 &&
                this.formControls.new_password.value ===
                this.formControls.verify_password.value) {
                return null;
            }
        }

        return { matchValues: true };
    }

    public showToast(data): void {
        this.appController.showToastPopUp(data, ToastComponent);
    }

    public stateSubmitHasChanged() {
        this.ngZone.runOutsideAngular(() => {
            setTimeout(() => this.hasClickSubmit = !this.hasClickSubmit, 2000);
        });
    }

    get formControls(): { [key: string]: AbstractControl } {
        return this._form.controls;
    }

    abstract submit(): void

    // patchValues(pRegistro: any) {
    //     let lValores = {}
    //     this.formControls.reset;
    //     Object.keys(this.formControls).forEach(key => {

    //         if (pRegistro[key]!=null && pRegistro[key]!=undefined) {
    //             let lValor = pRegistro[key];              
    //             lValores[key] = lValor;
    //         }
    //     });

    //     this._form.patchValue(lValores, { emitEvent: false });
    // }

    // obterNomeItem(pItem) {
    //     return pItem ? pItem.nome : undefined;
    // }

}