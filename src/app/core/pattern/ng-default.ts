import { Select } from '@ngxs/store';
import { AppState } from 'src/app/shared/state/app.state';
import { Observable, Subscription } from 'rxjs';
import { NgFormErrorType } from './ng-form-error-type';
import { NgFormErrorMesssage } from './ng-form-error-msg';


export abstract class NgDefault {

    public errorMsgs: { [key: string]: any } = {};
    public hasClickSubmit: boolean = false;

    @Select(AppState.hasMobileMatches) stateMobileMatches$: Observable<any>;
    public stateMobileMatchesSubscription$: Subscription;

    public hasMobileMatches: boolean;

    constructor() {
        this.stateMobileMatchesSubscription$ = this.stateMobileMatches$.subscribe(state => this.hasMobileMatches = state);
    }

    public getStyle(trueValue, falseValue): string {
        return this.hasMobileMatches ? trueValue : falseValue;
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

}