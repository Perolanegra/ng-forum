import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { FormGroup, AbstractControl } from "@angular/forms";
import * as moment from 'moment';


export abstract class NgDefault  {

   
    public maskConfig = {
        mask: [
            new RegExp('\\d'),
            new RegExp('\\d'),
            '/',
            new RegExp('\\d'),
            new RegExp('\\d'),
            '/',
            new RegExp('\\d'),
            new RegExp('\\d'),
            new RegExp('\\d'),
            new RegExp('\\d')
        ],
        showMask: false,
        guide: false,
        placeholderChar: '_'
    };

    constructor(protected route: ActivatedRoute, protected router: Router) {
      

        
    }

    //Metodo que mostra o nome do objeto no autocomplete.
    obterNomeItem(item) {
        if (item) { return item.nome; }
    }

    //Método que obtém a resposta dos resolvers.
    get respResolvers() {
        return this.route.snapshot.data
    }

    getUser() {        
        return this.respResolvers.user?this.respResolvers.user:null;
    }
    //Método que obtém a resposta dos resolvers.
    get parentRespResolvers() {
        return this.route.parent.snapshot.data
    }

    //Retorna o JSON de parâmetros criados a partir do form recebido
    criarParamsRotaForm(pForm: FormGroup) {
        let lControls = Object.keys(pForm.controls);
        let lParams = {};
        lControls.forEach(index => {
            let lValor = pForm.controls[index].value;
            if (lValor != null && typeof lValor != undefined && lValor.toString() != '') {
                //DMN-29257
                if (lValor instanceof Date) {
                    lValor = moment(lValor);
                }
                if (moment.isMoment(lValor)) {
                    lValor = lValor.format("YYYY-MM-DDTHH:mm:ss.SSS-03:00");
                }
                lParams[index] = lValor;
            }
        });

        return lParams;
    }

    //Retorna o JSON de parâmetros criados a partir do formbuilder de filtro
    criarParamsRota(pParams: string[], pValues: any[]) {
        let lParams = {};
        let i = 0;
        pParams.forEach(lParam => {

            let lValor = pValues[i];

            if (lValor != null && typeof lValor != undefined && lValor.toString() != '') {
                //DMN-29257
                if (lValor instanceof Date) {
                    lValor = moment(lValor);
                }
                if (moment.isMoment(lValor)) {
                    lValor = lValor.format("YYYY-MM-DDTHH:mm:ss.SSS-03:00");
                }
                lParams[lParam] = lValor;
            }
            i++;

        });

        return lParams;
    }


    criarParamsRotaJSON(pParams: { [key: string]: any }) {

        let lParams: string[] = Object.keys(pParams);
        let lValues: any[] = [];
        let i = 0;
        lParams.forEach(key => {

            lValues[i] = pParams[key];
            i++;
        })

        return this.criarParamsRota(lParams, lValues);

    }



    obterRotaAtual() {


        let lParams = this.obterParamsRotaCorrente();



        return [this.obterUrlRotaAtual(), lParams];
    }

    obterUrlRotaAtual():string {
        //Retorna a url da rota atual, sem os parametros
        let lIndex = this.router.url.indexOf(';');
        if (lIndex >= 0) {
            //A partir do ';' vem os parametros que devem ser desconsiderados
            return this.router.url.substring(0, this.router.url.indexOf(';'));
        } else {
            return this.router.url;
        }
    }
    obterParamsRotaCorrente() {
        return this.route.snapshot.params;
    }

    formatarData(pIsoDate: string) {
        if (pIsoDate != null) {
            return moment.utc(pIsoDate).format('DD/MM/YYYY');
        } else {
            return null;
        }

    }
    formatarDataHora(pIsoDate: string) {
        if (pIsoDate != null) {
            return moment.utc(pIsoDate).format('DD/MM/YYYY HH:mm');
        } else {
            return null;
        }

    }

    public obterParametro(pParametro: string) {
        let lParametro = this.route.snapshot.paramMap.get(pParametro);
        if (lParametro != null && lParametro != "undefined") {
            return lParametro;
        } else {
            return null;
        }
    }

    public obterPrimeiroNome(pNome: string): string {
        let [primeiroNome] = pNome.split(' ');
        return primeiroNome;
    }


    get startOfMonth(): string {
        return moment().startOf('month').format('YYYY-MM-DDTHH:mm:ss.SSS-03:00');
    }

    get endOfMonth(): string {
        return moment().endOf('month').format('YYYY-MM-DDTHH:mm:ss.SSS-03:00');
    }

    obterId(pObj) {
        if (pObj != null && typeof pObj != undefined) {
            return pObj.id;
        } else {
            return null;
        }
    }


    //Atualiza a tela corrente
    reload() {
        window.location.reload(true);

    }

    //Desabilita e limpa um controle de formGroup 
    desabilitarFormControl(pControl: AbstractControl) {
        pControl.disable();
        pControl.setValue(null);
    }


    public mascararData(event, pFormControl) {
        if (event.keyCode == 8 && !event.target.value) {
            pFormControl.setValue("");
        }
    }

    public mascararDataFiltro(event, pFormControl) {
        if (event.keyCode == 8 && !event.target.value) {
            pFormControl.setValue(null);
        }
    }

    //Forca a validação dos campos do form recebido como parâmetro
    validarForm(pFormGroup: FormGroup): boolean {

        pFormGroup.markAsTouched({ onlySelf: true });
        Object.keys(pFormGroup.controls).forEach(key => {
            pFormGroup.controls[key].markAsTouched({ onlySelf: true });

        });

        return pFormGroup.valid;

    }
}