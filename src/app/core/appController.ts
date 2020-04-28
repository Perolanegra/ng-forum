import { Injectable, Renderer2, ElementRef, RendererFactory2 } from "@angular/core";
import { AbstractControl } from "@angular/forms";
import { debounceTime, tap, map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { Router } from "@angular/router";
import { Observable, from } from "rxjs";
import { MatDialog, MatDialogRef } from '@angular/material/dialog';



@Injectable()
export class AppController {
    public msg = "";
    private _ambiente = null;
    private renderer: Renderer2;

    constructor(public dialog: MatDialog,
        private rendererFactory: RendererFactory2,
        private router: Router) {
        this.renderer = rendererFactory.createRenderer(null, null);
    }

    tratarErro(err): void {

        console.log('como chega o erro: ', err);
        // this.msg = err.message || err.error_description;

        //Erros de Response(possuem status)
        // if (err.status != undefined && err.status != null) {
        //     if (err.status == 401) {

        //         if (err.error.error == "invalid_token") {
        //             // this.openDialogSessaoExpirada();
        //             this.msg = 'Sua sessão expirou, favor realizar o login novamente.';

        //         } else {
        //             //Token expirado			
        //             this.msg = 'Acesso não autorizado, verifique seu login ou procure o suporte técnico.';
        //         }
        //     } else {
        //         if (err.status == 500) {
        //             this.msg = 'Um problema não esperado ocorreu durante a execução do serviço. Por favor, tente novamente mais tarde.';
        //         } else {
        //             if (err.status == 404) {

        //                 this.msg = 'O serviço solicitado encontra-se indisponível no momento. Por favor, tente novamente mais tarde.';
        //             } else {

        //                 if (err.status == 0) {

        //                     this.msg = 'Foi impossível conectar com o servidor. Verifique sua conexão com a internet ou tente novamente mais tarde.';
        //                 } else {

        //                     if (err.status == 400) {
        //                         if (err.error && err.error.error == 'invalid_grant') {
        //                             this.msg = 'Usuário ou senha não reconhecidos. Verifique os dados informados e o acionamento da tecla CAPSLOCK.';
        //                         } else {
        //                             this.msg = err.error.message;
        //                         }
        //                     } else {

        //                         if (err.json != undefined) {
        //                             let errJson = err.error.json();
        //                             this.msg = errJson.message || errJson.error_description
        //                         } else {
        //                             this.msg = err.message || err.error_description
        //                         }
        //                     }
        //                 }
        //             }
        //         }
        //     }

        // }
        // this.exibirErro(this.msg);
    }

    // openDialogSessaoExpirada(): MatDialogRef<DialogSessaoExpiradaComponent> {

    //     let dialogRef = this.dialog.open(DialogSessaoExpiradaComponent, {
    //         width: '250px',
    //         autoFocus: true
    //     });
    //     return dialogRef;
    // }

    // openDialogAguarde(): MatDialogRef<DialogAguardeComponent> {

    //     let dialogRef = this.dialog.open(DialogAguardeComponent, {
    //         width: '250px', disableClose: true
    //     }
    //     );
    //     return dialogRef;
    // }


    // openDialogConfirmacao(pMsg): MatDialogRef<any> {
    //     let lMsg: string = pMsg;
    //     //Verifica se tem ao menos um item selecionado e abre o modal para confirmar a exclusão
    //     let dialogRef = null;

    //     dialogRef = this.dialog.open(DialogConfirmacaoComponent, {
    //         width: '250px',
    //         data: { msg: lMsg },
    //         autoFocus: true

    //     });

    //     return dialogRef;
    // }

    // exibirSucesso(msg: string) {
    //     setTimeout(() => this.toastr.success(msg, ''));
    // }

    // exibirErro(msg: string) {
    //     setTimeout(() => this.toastr.error(msg, ''));
    // }

    // exibirWarning(msg: string) {
    //     setTimeout(() => this.toastr.warning(msg, ''));
    // }

    // exibirInformacao(msg: string) {
    //     setTimeout(() => this.toastr.info(msg, ''));
    // }

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

    // public get versao() {
    //     return environment.versao;
    // }

    public get ambiente() {
        return this._ambiente;
    }

    /**
    * Retorna para uma nova rota de navegação.
    * @param path Recebe uma string como parâmetro que faz referência a rota a ser navegada.
    * @author igor.alves
    */
    public navigate(path: string) {
        // let lDialogAguarde = this.openDialogAguarde();
        this.router.navigate(['/' + path]).then(
            pResp => {
            }).catch(
                error => {
                    this.tratarErro(error);
                });
    }

    public setRoutesNav(fillerNav: Object): void {
        localStorage.setItem('fillerNav', JSON.stringify(fillerNav));
    }

    public getRoutesNav(): any {
        return JSON.parse(localStorage.getItem('fillerNav'));
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

    async fillerNavs(): Promise<Object> {
        return new Object({
            routes: [
                { name: 'Início', isActive: true, imgName: 'home.png', path: 'home', img: await this.getImg('home.png') },
                { name: 'Configurações', isActive: false, imgName: 'configs.svg', path: 'configs', img: await this.getImg('configs.svg') },
                { name: 'Meus Issues', isActive: false, imgName: 'my-issues.png', path: 'my-issues', img: await this.getImg('my-issues.png') },

            ]
        });
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
     * Método que retorna a referência da img, se existir, se não retorna nulo.
     * @param nameSvg Nome da img passado como parâmetro para busca.
     * @author igor.alves
     */
    public getImg(nameSvg: string): Promise<any> {
        return new Promise(async (resolve, reject) => {
            let prefix = `../../assets/imgs/`;

            let searchImg: string, isValidImg;

            searchImg = prefix + nameSvg;
            isValidImg = await this.verifyImg(searchImg);

            if (isValidImg) {
                resolve(searchImg);
            }

        });
    }

    verifyImg(img): Promise<any> {
        return new Promise((resolve, reject) => {
            // if(formatSvg === '.svg') {

            //     let svg = new SVGElement();
            //     svg.onload = function() {
            //         resolve(true);
            //     };

            //     svg.onerror = function() {
            //         resolve(false);
            //     };
            //     svg = img;

            // }
            // else {
            let image = new Image();
            image.onload = function () {
                resolve(true);
            };

            image.onerror = function () {
                resolve(false);
            };

            image.src = img;
            // }

        });
    }





}