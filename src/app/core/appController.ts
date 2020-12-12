import { Injectable, Renderer2, ElementRef, RendererFactory2, TemplateRef } from "@angular/core";
import { AbstractControl } from "@angular/forms";
import { debounceTime, tap } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { Router } from "@angular/router";
import { Observable, BehaviorSubject } from "rxjs";
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Store, Select } from '@ngxs/store';
import { NgxSpinnerService } from 'ngx-spinner';
import { ComponentType } from '@angular/cdk/portal';
import { AppActions } from '../state/app/app.actions';


@Injectable()
export class AppController {
    @Select(state => state.app.hasMobileMatches) hasMobileMatches$: Observable<any>;

    private renderer: Renderer2;
    private imgRenderer: BehaviorSubject<String> = new BehaviorSubject(null);

    constructor(public dialog: MatDialog,
        private rendererFactory: RendererFactory2,
        private spinner: NgxSpinnerService,
        private _store: Store,
        private router: Router) {
        this.renderer = this.rendererFactory.createRenderer(null, null);
    }

    public dipatchMobileMatches(hasMobileMatches: boolean): void {
        this._store.dispatch(new AppActions.SetMediaScreen(hasMobileMatches));
    }

    public getMobileMatches(): Promise<any | undefined> {
        return new Promise((resolve, reject) => {
            this.hasMobileMatches$.subscribe(state => {
                resolve(state);
            })
        });
    }

    tratarErro(err): void {
        this.exibirErro(err);
    }

    showToastPopUp(paylaod: any, component: ComponentType<any> | TemplateRef<any>): MatDialogRef<any> {
        let dialogRef = null;
        const { positionTop, positionBottom, positionLeft, positionRight } = paylaod.style;
        
        dialogRef = this.dialog.open(component, {
            data: paylaod,
            hasBackdrop: true,
            disableClose: true,
            position: {
                top: positionTop ? positionTop : '',
                bottom: positionBottom ? positionBottom : '',
                left: positionLeft ? positionLeft : '',
                right: positionRight ? positionRight : ''
            }
        });

        return dialogRef;
    }

    // exibirSucesso(msg: string) {
    //     setTimeout(() => this.toastr.success(msg, ''));
    // }

    exibirErro(msg: string) {
        // this.toastr.error(msg, '', {
        //     progressAnimation: 'decreasing',
        //     progressBar: true,
        //     closeButton: true,
        //     tapToDismiss: true,
        // });
    }

    orderBy(records: Array<any>, atributos: string[], direction: string): any {
        let directions;
        if (direction == "asc") {
            directions = [1];
        } else {
            if (direction == "desc") {
                directions = [-1];
            }
        }
        return records.sort(function (a, b) {
            for (let i = 0; i < atributos.length; i++) {
                if (a[atributos[i]] < b[atributos[i]]) {
                    return -1 * directions[i]
                }
                else if (a[atributos[i]] > b[atributos[i]]) {
                    return 1 * directions[i];
                }
            }
            return 0;
        });

    };

    /** 
     * Trata o autocomplete para campos de objetos que repesentam entidades com ID
     * @pFormControlEntidade Campo que contem a instancia do ojeto selecionado
     * @pFormControlIdEntidade Campo que contem o ID da instancia do objeto selecionado
     * @pFuncaoTratamento Função responsável por obter os registros de um `Autocomplete`
     * @pTamanhoMinimo Quantidade mínima de caractere digitado para efetuar a requisição
    */
    public tratarAutoCompleteEntidade(pFormControlEntidade: AbstractControl, pFormControlIdEntidade: AbstractControl, pFuncaoTratamento, pTamanhoMinimo: number = 4) {
        //Inicia o id com o id da entidade recebida.
        if (pFormControlEntidade.value) {
            pFormControlIdEntidade.setValue(pFormControlEntidade.value.id);
        } else {
            pFormControlIdEntidade.reset();
        }
        pFormControlEntidade
            .valueChanges
            .pipe(
                debounceTime(500),
                tap(async pValue => {
                    if (pValue && pValue.length >= pTamanhoMinimo && pValue != null && pValue.toString() != '') {
                        try {
                            pFuncaoTratamento(pValue);

                        } catch (err) {
                            this.tratarErro(err);
                        }
                    }
                })
            ).subscribe(entidade => {

                //Na mudança do autocomplete, atualiza o id associado
                if (entidade != null && entidade.id) {
                    pFormControlIdEntidade.setValue(entidade.id);
                } else {
                    pFormControlIdEntidade.reset();
                }
            })

    }

    public get release() {
        return environment.release;
    }

    /**
    * @author igor.alves
    * @param path Recebe uma string como parâmetro que faz referência a rota a ser navegada.
    * @description Retorna para uma nova rota de navegação.
    */
    public navigate(path: string) {
        this.router.navigate(['/' + path])
            .catch(error => console.log('error: ', error))
            .finally(() => this.spinner.hide());
    }

    public hideSpinner() {
        this.spinner.hide();
    }

    /**
    * Retorna um novo Array ordenado de Objetos com os atributos que foram passados e parâmetro de ordenação.
    * @param pArray Recebe o array iterável original o qual quer se capturar os atributos.
    * @param pAtributos Atributo(s) que serão retornados em um novo array.
    * @param pOrderBy Atributo que será realizada a ordenação.
    * @author igor.silva
    */
    public removeAndSort(pArray: Array<any>, pAtributos: Array<any>, pOrderBy: string) {
        let lNovoArray = [];

        pArray.forEach((pVal) => {
            pAtributos.forEach(prop => {
                lNovoArray.push(pVal[prop]);
            });
        });

        return this.orderBy(lNovoArray, pAtributos, pOrderBy);
    }

    /**
    * Retorna a nova String sem os parâmetros de caracteres passados.
    * @param pStr String que deseja ser alterada.
    * @param pArray Array de caracteres que deseja retirar da String passada.
    * @author igor.silva
    */
    public removeCpfFormat(pStr: string, pArray: Array<any>) {
        let lStr = pStr;
        let lReplace;
        let lReg;

        pArray.forEach(item => {
            if (pStr != undefined && pStr != null) {
                lReplace = item;
                if (item == ".") {
                    lReplace = /\./;
                }

                lReg = new RegExp(lReplace, "g");
                lStr = lStr.replace(lReg, '');
            }
        });

        return lStr;
    }

    downloadArquivo(pNome: string, pMimeType: string, pResp: any) {
        try {
            const blob = new Blob([pResp], { type: pMimeType });
            let nomeArquivo = pNome;

            if (window.navigator && window.navigator.msSaveOrOpenBlob) {
                window.navigator.msSaveOrOpenBlob(blob, nomeArquivo);
            } else {
                var a = document.createElement('a');
                a.href = URL.createObjectURL(blob);
                a.download = nomeArquivo;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
            }
        } catch (err) {
            this.tratarErro(err);
        }
    }

    /**
    * Retorna um objeto com as propriedades de ano, mês e dia da Data passada.
    * @param pDataBr String da data em formato br. Exemplo: 07/08/2019 ou 07-08-2019.
    * @author igor.silva
    */
    obterAnoMesDia(pDataBr: string): Object {
        let lObjRetorno: any = {
            dia: new String(),
            mes: new String(),
            ano: new String()
        };

        for (let i = 0; i < pDataBr.length; i++) {
            if (i < 2) {
                lObjRetorno.dia += pDataBr.charAt(i);
            }
            else if (i > 2 && i < 5) {
                lObjRetorno.mes += pDataBr.charAt(i);
            }
            else if (i > 5 && i < 10) {
                lObjRetorno.ano += pDataBr.charAt(i);
            }
        }

        return lObjRetorno;
    }

    fillerNavs() {
        return [
            { name: 'Início', isActive: false, imgName: 'home.png', path: 'home', img: this.getImgObserver('home.png') },
            { name: 'Configurações', isActive: false, imgName: 'configs.svg', path: 'profile', img: this.getImgObserver('configs.svg') },
            { name: 'Meus Issues', isActive: false, imgName: 'my-issues.png', path: 'profile', img: this.getImgObserver('my-issues.png') },
        ];

    }

    /**
     * Método que adiciona classe passada como parâmetro em determinado elemento.
     * @param nativeElement Elemento a ser estilizado, nativeElement.
     * @param classOn Classe css a ser aplicada.
     * @returns void
     * @author igor.alves
     */
    setElementClass(nativeElement: ElementRef, classOn: string) {
        this.renderer.addClass(nativeElement, classOn);
    }

    /**
     * Método que remove a classe passada como parâmetro em determinado elemento.
     * @param nativeElement Elemento o qual a classe será removida.
     * @param classOff Classe que será removida.
     * @author igor.alves
     */
    removeElementClass(nativeElement: ElementRef, classOff: string): void {
        this.renderer.removeClass(nativeElement, classOff);
    }

    /**
     * Método que estiliza o elemento de acordo com a propriedade passada.
     * @param elementRef Elemento a ser estilizado, nativeElement.
     * @param key Propriedade css a ser aplicada.
     * @param value Valor css a ser aplicado.
     * @returns void
     * @author igor.alves
     */
    setElementStyle(element: Element, key: string, value: string): void {
        this.renderer.setStyle(element, key, value);
    }

    /**
     * Método que retorna a o Observable do path da img procurada.
     * @param nameSvg Nome da img passado como parâmetro para busca.
     * @author igor.alves
     */
    public getImgObserver(nameSvg: string): Observable<String> {
        const prefix = environment.prefixImg;
        let searchImg, isValidImg;

        searchImg = prefix + nameSvg;
        isValidImg = this.verifyImg(searchImg).then(value => {
            if (value) this.imgRenderer.next(searchImg);
        });

        return this.imgRenderer;
    }

    verifyImg(img): Promise<any> {
        return new Promise((resolve, reject) => {
            let image = new Image();
            image.onload = function () {
                resolve(true);
            };

            image.onerror = function () {
                resolve(false);
            };

            image.src = img;
        });
    }

    /**
     * @author igor.alves
     * @param path Parâmetro da nova rota ativa que será exibido no Menu.
     * @description Método tem como objetivo setar novo estado pras rotas da aplicação.
     */

    setMenuActiveLink(path: string): void {
        let routes = this.fillerNavs();
        if (routes) {
            routes.map((prop) => prop.isActive = prop.path === path);
            this._store.dispatch(new AppActions.SetRouteState(routes));
        }
    }

    getFillerNav(): Observable<any> {
        return this._store.select(state => {
            return state.app.routes;
        });
    }

    public getColorRef(type): string {
        const call = {
            error: () => { return '#ff4444' },
            info: () => { return '#33b5e5' },
            warning: () => { return '#ffbb33' },
            success: () => { return '#00C851' },
        }

        return call[type]();
    }

    public getColorRefDark(type): string {
        const call = {
            error: () => { return '#CC0000' },
            info: () => { return '#0099CC' },
            warning: () => { return '#FF8800' },
            success: () => { return '#007E33' },
        }

        return call[type]();
    }

    // public hasSameValue(str1: string = this.isRequired('str1'), str2: string = this.isRequired('str2')): boolean {
    //     return str1 === str2;
    // }

    // public isRequired = text => {
    //     throw new Error(`${text} é obrigatório.`);
    // }

}

