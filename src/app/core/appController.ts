import {
  Injectable,
  Renderer2,
  ElementRef,
  RendererFactory2,
  TemplateRef,
} from "@angular/core";
import { AbstractControl } from "@angular/forms";
import { debounceTime, tap } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { Router } from "@angular/router";
import { Observable, Subject, BehaviorSubject, of } from "rxjs";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { Store, Select } from "@ngxs/store";
import { NgxSpinnerService } from "ngx-spinner";
import { ComponentType } from "@angular/cdk/portal";
import { AppActions } from "../state/app/app.actions";
import { Constants } from "./pattern/constants";
import { AuthActions } from "../state/auth/auth.actions";
import { RoutesModel } from "../models/routes.model";
import tippy from "tippy.js";

@Injectable()
export class AppController {
  @Select((state) => state.app.hasMobileMatches)
  hasMobileMatches$: Observable<any>;
  private renderer: Renderer2;
  private imgRenderer: BehaviorSubject<String> = new BehaviorSubject(null);

  constructor(
    public dialog: MatDialog,
    private rendererFactory: RendererFactory2,
    private spinner: NgxSpinnerService,
    private _store: Store,
    private router: Router
  ) {
    this.renderer = this.rendererFactory.createRenderer(null, null);
  }

  public dipatchMobileMatches(hasMobileMatches: boolean): void {
    this._store.dispatch(new AppActions.SetMediaScreen(hasMobileMatches));
  }

  public getMobileMatches(): Promise<any | undefined> {
    return new Promise((resolve, reject) => {
      this.hasMobileMatches$.subscribe((state) => {
        if (state) resolve(state);
      });
    });
  }

  handleError(err): JSON {
    let payloadError;
    payloadError = err.error;

    if (err.status === 0 || err.status === 503) {
      payloadError = {
        style: { posTop: "5vh" },
        title: "Fora de uso",
        message: "O Servidor está offline.",
        type: "error",
      };
    } else if (err.status === 401) {
      this._store.dispatch(new AuthActions.RemoveAccess());
      this._store.dispatch(new AppActions.RemoveRouteState());
    }

    this.triggerCustomEvent("HandleStateSpinner", {
      value: false,
    });

    return payloadError;
  }

  showToastPopUp(
    payload: any,
    component: ComponentType<any> | TemplateRef<any>
  ): MatDialogRef<any> {
    let dialogRef = null;

    dialogRef = this.dialog.open(component, {
      data: payload,
      hasBackdrop: true,
      disableClose: true,
      position: payload.style
        ? {
            top: payload.style.posTop ? payload.style.posTop : "",
            bottom: payload.style.posBottom ? payload.style.posBottom : "",
            left: payload.style.posLeft ? payload.style.posLeft : "",
            right: payload.style.posRight ? payload.style.posRight : "",
          }
        : null,
    });

    return dialogRef;
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
          return -1 * directions[i];
        } else if (a[atributos[i]] > b[atributos[i]]) {
          return 1 * directions[i];
        }
      }
      return 0;
    });
  }

  /**
   * Trata o autocomplete para campos de objetos que repesentam entidades com ID
   * @pFormControlEntidade Campo que contem a instancia do ojeto selecionado
   * @pFormControlIdEntidade Campo que contem o ID da instancia do objeto selecionado
   * @pFuncaoTratamento Função responsável por obter os registros de um `Autocomplete`
   * @pTamanhoMinimo Quantidade mínima de caractere digitado para efetuar a requisição
   */
  public tratarAutoCompleteEntidade(
    pFormControlEntidade: AbstractControl,
    pFormControlIdEntidade: AbstractControl,
    pFuncaoTratamento,
    pTamanhoMinimo: number = 4
  ) {
    //Inicia o id com o id da entidade recebida.
    if (pFormControlEntidade.value) {
      pFormControlIdEntidade.setValue(pFormControlEntidade.value.id);
    } else {
      pFormControlIdEntidade.reset();
    }
    pFormControlEntidade.valueChanges
      .pipe(
        debounceTime(500),
        tap(async (pValue) => {
          if (
            pValue &&
            pValue.length >= pTamanhoMinimo &&
            pValue != null &&
            pValue.toString() != ""
          ) {
            try {
              pFuncaoTratamento(pValue);
            } catch (err) {
              this.handleError(err);
            }
          }
        })
      )
      .subscribe((entidade) => {
        //Na mudança do autocomplete, atualiza o id associado
        if (entidade != null && entidade.id) {
          pFormControlIdEntidade.setValue(entidade.id);
        } else {
          pFormControlIdEntidade.reset();
        }
      });
  }

  public get release() {
    return environment.release;
  }

  /**
   * @author igor.alves
   * @param path Recebe uma string como parâmetro que faz referência a rota a ser navegada.
   * @description Retorna para uma nova rota de navegação.
   */
  public navigate(path: string): void {
    this.router
      .navigate(["/" + path])
      .catch((error) => console.log("error: ", error))
      .finally(() => this.spinner.hide());
  }

  /**
   * @author igor.alves
   * @param path Recebe uma string como parâmetro que faz referência a rota a ser navegada.
   * @param params Array de parametros a serem expostos na URL que são obtidos nos resolvers se implementado.
   * @description Retorna para uma nova rota de navegação.
   */
  public navigateWithParams(path: string, params: any[]): void {
    this.router
      .navigate(["/" + path, ...params])
      .catch((error) => console.log("error: ", error))
      .finally(() => this.spinner.hide());
  }

  public hideSpinner(): void {
    this.spinner.hide();
  }

  public showSpinner(): void {
    this.spinner.show();
  }

  /**
   * Retorna um novo Array ordenado de Objetos com os atributos que foram passados e parâmetro de ordenação.
   * @param pArray Recebe o array iterável original o qual quer se capturar os atributos.
   * @param pAtributos Atributo(s) que serão retornados em um novo array.
   * @param pOrderBy Atributo que será realizada a ordenação.
   * @author igor.silva
   */
  public removeAndSort(
    pArray: Array<any>,
    pAtributos: Array<any>,
    pOrderBy: string
  ) {
    let lNovoArray = [];

    pArray.forEach((pVal) => {
      pAtributos.forEach((prop) => {
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

    pArray.forEach((item) => {
      if (pStr != undefined && pStr != null) {
        lReplace = item;
        if (item == ".") {
          lReplace = /\./;
        }

        lReg = new RegExp(lReplace, "g");
        lStr = lStr.replace(lReg, "");
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
        var a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = nomeArquivo;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }
    } catch (err) {
      this.handleError(err);
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
      ano: new String(),
    };

    for (let i = 0; i < pDataBr.length; i++) {
      if (i < 2) {
        lObjRetorno.dia += pDataBr.charAt(i);
      } else if (i > 2 && i < 5) {
        lObjRetorno.mes += pDataBr.charAt(i);
      } else if (i > 5 && i < 10) {
        lObjRetorno.ano += pDataBr.charAt(i);
      }
    }

    return lObjRetorno;
  }

  fillerNavs(): Array<RoutesModel> {
    // TODO: ajustar os paths e criar as rotas restantes
    return [
      {
        name: "Início",
        isActive: false,
        imgName: Constants.defaultPattern.imgs.homeIssues,
        path: "issues",
        img: this.getImg(Constants.defaultPattern.imgs.homeIssues),
      },
      {
        name: "Meus Issues",
        isActive: false,
        imgName: Constants.defaultPattern.imgs.myIssues,
        path: "profile",
        img: this.getImg(Constants.defaultPattern.imgs.myIssues),
      },
      {
        name: "Configurações",
        isActive: false,
        imgName: Constants.defaultPattern.imgs.configs,
        path: "home",
        img: this.getImg(Constants.defaultPattern.imgs.configs),
      },
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
   * Método que retorna a path da img procurada.
   * @param filename Nome do arquivo img/svg passado como parâmetro para busca.
   * @author igor.alves
   */
  public getImg(filename: string): string {
    const prefix = environment.prefixImg;
    let searchImg;

    searchImg = prefix + filename;
    let image = new Image();
    image.src = searchImg;

    image.onerror = function (err) {
      console.log("erro: ", err);
    };

    return searchImg;
  }

  /**
   * @author igor.alves
   * @param path Parâmetro da nova rota ativa que será exibido no Menu.
   * @description Método tem como objetivo setar novo estado pras rotas da aplicação.
   */

  setMenuActiveLink(path: string): void {
    let routes = this.fillerNavs();
    if (routes) {
      routes.map((prop) => (prop.isActive = prop.path === path));
      this._store.dispatch(new AppActions.SetRouteState(routes));
    }
  }

  getFillerNav(): Observable<any> {
    return this._store.select((state) => {
      return state.app.routes;
    });
  }

  public getColorRef(type): string {
    const call = {
      error: () => {
        return "#ff4444";
      },
      info: () => {
        return "#178ab4";
      },
      warning: () => {
        return "#ffbb33";
      },
      success: () => {
        return "#00C851";
      },
    };

    return call[type]();
  }

  public getColorRefDark(type): string {
    const call = {
      error: () => {
        return "#CC0000";
      },
      info: () => {
        return "#0099CC";
      },
      warning: () => {
        return "#FF8800";
      },
      success: () => {
        return "#007E33";
      },
    };

    return call[type]();
  }

  triggerCustomEvent(eventName: string, params: any = {}) {
    let event;
    if (typeof Event === "function") {
      event = new CustomEvent(eventName, { detail: params });
    } else {
      event = document.createEvent("Event");
      event.initEvent(eventName, true, true);
    }
    window.dispatchEvent(event);
  }

  public countStars(data: { stars: number; pplVoted: number }): string {
    const svg: HTMLElement = document.createElement("svg");
    svg.innerHTML = `
      <svg width="15" height="15" viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg">
        <path class="iss-stars"
          d="M5.483.314l1.128 2.39a.54.54 0 0 0 .405.308l2.522.383c.442.067.618.635.299.96l-1.825 1.86a.58.58 0 0 0-.155.499l.43 2.626c.076.46-.386.811-.78.594L5.25 8.694a.518.518 0 0 0-.502 0l-2.255 1.24c-.395.217-.857-.134-.782-.594l.431-2.626a.58.58 0 0 0-.155-.499L.163 4.355c-.32-.326-.143-.893.299-.96l2.522-.383a.54.54 0 0 0 .405-.308L4.517.314a.528.528 0 0 1 .966 0z">
        </path>
      </svg>`;

    const average = data.stars / data.pplVoted;
    let htmlSVG = "";

    for (let i = 0; i < parseInt(average.toString()); i++)
      htmlSVG = htmlSVG.concat(svg.innerHTML);

    return htmlSVG;
  }

  // public hasSameValue(str1: string = this.isRequired('str1'), str2: string = this.isRequired('str2')): boolean {
  //     return str1 === str2;
  // }

  // public isRequired = text => {
  //     throw new Error(`${text} é obrigatório.`);
  // }

  public setTooltip(querySelectorSearch: string): void {
    const nodeList: NodeListOf<HTMLElement> =
      document.querySelectorAll(querySelectorSearch);
    nodeList.forEach((e: HTMLElement) => {
      // Se entrar precisa exibir o tooltip
      if (this.isEllipsisActive(e)) {
        tippy(e, {
          content: e.textContent,
        });
      }
    });
  }

  private isEllipsisActive(e: HTMLElement): boolean {
    return e.offsetHeight < e.scrollHeight;
  }
}
