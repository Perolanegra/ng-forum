import { FormGroup, FormBuilder, AbstractControl, ValidationErrors, FormControl } from "@angular/forms";
import { AppController } from './appController';
import { NgDefault } from './pattern/ng-default';
import { NgFormErrorMesssage } from './pattern/ng-form-error-msg';
import { Subscription } from 'rxjs';
import { NgZone } from '@angular/core';
import { NgFormErrorType } from './pattern/ng-form-error-type';
import { NgxSpinnerService } from 'ngx-spinner';


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
        protected spinner?: NgxSpinnerService
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

    public setInitControlsPadding(): void {
        const controls = Object.keys(this._form.value);
        controls.forEach(control => {
            this.styleFormFieldObject[control] = {};
            this.styleFormFieldObject[control].paddingBottom = '0%';
        });
    }

    /**
     * @author igor.alves
     * @param controlArr string do control que é o formArray
     */
    public setInitControlsPaddingFormArr(controlArr: string): void {
        const controls = Object.keys(this._form.value);
        const constrolsArr = Object.keys(this._form.value[controlArr]);
        controls.forEach(control => {
            this.styleFormFieldObject[control] = {};
            if (controlArr == control) {
                constrolsArr.map(controlName => {
                    this.styleFormFieldObject[control][controlName] = {};
                    this.styleFormFieldObject[control][controlName].paddingBottom = '0%'
                });
            }
            this.styleFormFieldObject[control].paddingBottom = '0%';
        });
    }

    public resetControlPadding(controls: string[]): void {
        controls.map(control => {
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

    public showToast(data, component): void {
        this.appController.showToastPopUp(data, component);
    }

    public stateSubmitHasChanged() {
        this.ngZone.runOutsideAngular(() => setTimeout(() => this.hasClickSubmit = !this.hasClickSubmit, 2000));
    }

    get formControls(): { [key: string]: AbstractControl } {
        return this._form.controls;
    }

    /**
     * @author  igor.alves
     * @description Método chamado após o form ser submetido e validado. Este método deve ser usado
     * para setar um novo state pro componente em questão, logo após o form ser submetido e validado, 
     * a lógica deve conter dentro dele respeitando as particularidades de cada component.
     * @returns void
     */
    public submittedIsValid(): void {}

    submit(hasSpinner: boolean = false): void { // centralizar no NgDialogDefault
        if (this._form.valid) {
            hasSpinner ? this.spinner.show() : null;
            this.submittedIsValid();
        }
    }

    public abstract setErrorValidation();

    /**
     * @author igor.alves
     * @param response objeto emitido do NgInputErrorComponent.
     * @param padding Basepadding que será multiplicado pelo index do erro para aplicar espaçamento para as mensagens.
     */
    public setPadding(response: any, padding?: string, control?: string) {        
        if (!response || !response?.controlName) {
            return;
        }

        if (!response?.index || response?.index < 2) {
            control ?
                this.styleFormFieldObject[response.controlName][control].paddingBottom = '0%'
                : this.styleFormFieldObject[response.controlName].paddingBottom = '0%';
        } else {
            const basePadding = padding ? Number(padding) : 1; // base é 1.5% qd tiver 2 elementos de erro, a cada mais 1 elemento, auemnta 2.5%.
            const resultPadding = basePadding * response.index;
            control ?
                this.styleFormFieldObject[response.controlName][control].paddingBottom = `${resultPadding}%`
                : this.styleFormFieldObject[response.controlName].paddingBottom = `${resultPadding}%`;
        }
    }

    /**
  * 
  * @param id index da string no array, caso for recuperar uma tipo específico ou todos. Caso for remover, é o index do elemento inicial a ser removido.
  * @param hasDelete booleano q decide se remove os elementos do array para retornar os elementos solicitados.
  * @param removeIndex (param opcional) o número de elementos que serão removidos a partir do index (param id) passado.
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
     * @param removeIndex (param opcional) o número de elementos que serão removidos a partir do index (param id) passado.
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