import { FormGroup, FormBuilder, AbstractControl, ValidationErrors, FormControl } from "@angular/forms";
import { AppController } from './appController';
import { NgDefault } from './pattern/ng-default';
import { NgFormErrorMesssage } from './pattern/ng-form-error-msg';
import { Subscription } from 'rxjs';
import { ToastComponent } from '../shared/components/toast/toast.component';
import { NgZone } from '@angular/core';
import { NgFormErrorType } from './pattern/ng-form-error-type';


export abstract class NgForm extends NgDefault {
    _form: FormGroup;
    
    public stateBtnSubmit: string = 'disabled';
    public errorMsgs: { [key: string]: any } = {};
    public hide1 = true;
    public hide2 = true;
    public hasClickedSubmit: boolean = false;
    public styleFormFieldObject: any = {};
    public comparableControls: { control1: string, control2: string } = { control1: '', control2: '' };
    public responseSubscription$: Subscription;

    constructor(protected formBuilder: FormBuilder,
        protected appController: AppController,
        protected hasKeepRegister: boolean,
        protected ngZone?: NgZone,
    ) {
        super();
        this._form = this.formBuilder.group({});
        hasKeepRegister ? this._form.addControl("keepRegister", new FormControl(false)) : null;
    }

    public abstract setForm(): void;

    public abstract getResponse(): any;

    public isValidForm(payload?: any): boolean {
        this.hasClickSubmit = this._form.valid;
        return this._form.valid;
    }

    public initStyleFormErrorMsg() {
        const controls = Object.keys(this._form.value);
        controls.forEach(control => {
            this.styleFormFieldObject[control] = {};
            this.styleFormFieldObject[control].paddingBottom = '0%';
        });
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
            if (pControl.value?.length < 8) return null;

            if (this.formControls[this.comparableControls.control1]?.value ===
                this.formControls[this.comparableControls.control2]?.value) {
                return null;
            }

            return { matchValues: true };
        }

        return null;
    }

    public setComparableFormValues(control1: string, control2: string) {
        this.comparableControls = { control1: control1, control2: control2 };
    }

    public showToast(data): void {
        this.appController.showToastPopUp(data, ToastComponent);
    }

    public stateSubmitHasChanged() {
        this.ngZone.runOutsideAngular(() => setTimeout(() => this.hasClickSubmit = !this.hasClickSubmit, 2000));
    }

    get formControls(): { [key: string]: AbstractControl } {
        return this._form.controls;
    }

    public abstract submit(): void

    public abstract setErrorValidation();

    public setPadding(response: any) {
        if (!response) {
            return;
        }

        if (!response?.index || response?.index < 2) {
            this.styleFormFieldObject[response.controlName].paddingBottom = '0%';
        } else {
            const basePadding = 1; // base é 1.5% qd tiver 2 elementos de erro, a cada mais 1 elemento, auemnta 2.5%.
            const resultPadding = basePadding * response.index;
            this.styleFormFieldObject[response.controlName].paddingBottom = `${resultPadding}%`;
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

            removeIndex ? types.splice(id, removeIndex) : types.splice(id);

            return types;

        } catch (error) {
            console.log('Erro recuperando types Validation: ', error);
        }
    }

    /**
     * 
     * @param id index da string no array, caso for recuperar uma mensagem específica ou todas. Caso for remover, é o index do elemento inicial a ser removido.
     * @param hasDelete (param opcional) booleano q decide se remove os elementos do array para retornar os elementos solicitados.
     * @param removeIndex (param opcional) index até o qual serão removidos os elementos.
     * @param qtdCharRule (param opcional) quantidade de caracteres mínimos para validação minLength, param opcional, caso não passe o default é 8. Caso for passar, o 3 parametro, removeIndex deve ser passado como null.
     */
    public getErrorMessages(id: number, hasDelete?: boolean, removeIndex?: number, qtdCharRule?: number): Array<any> {
        try {
            const ngFormMsgObj = new NgFormErrorMesssage();
            const msgs = qtdCharRule ? ngFormMsgObj.getMessages(qtdCharRule) : ngFormMsgObj.getMessages();

            if (!hasDelete) {
                if (id < 0) return [...msgs];
                return [msgs[id]];
            }

            removeIndex ? msgs.splice(id, removeIndex) : msgs.splice(id);

            return msgs;

        } catch (error) {
            console.log('Erro recuperando msgs Validation: ', error);
        }
    }

    public setErrorMsgs(control: string, types: string[], msgs: string[]): void {
        const payload = this.setErrors(control, types, msgs);
        this.errorMsgs[control] = payload[control];
    }

    public setErrors(control: string, types: string[], msgs: string[]) {
        let errorResponse: any = {};
        errorResponse[control] = new Array<any>();

        types.map((type, key) => {
            errorResponse[control].push({ type: type, msg: msgs[key] });
        });

        return errorResponse;
    }

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