import { Component, ChangeDetectorRef, HostListener } from "@angular/core";
import { AppController } from "./core/appController";
import { Store, Actions, ofActionDispatched } from "@ngxs/store";
import { Subscription } from "rxjs";
import { AuthActions } from "./state/auth/auth.actions";
import { MediaMatcher } from "@angular/cdk/layout";
import { AppActions } from "./state/app/app.actions";
import { NgDefault } from "./core/pattern/ng-default";
import { ActivatedRoute } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent extends NgDefault {
  public stepContent = [
    {
      title: "Entre com as informações do Item",
      fields: [
        {
          type: "textinput",
          field: "Título",
          id: "tit-1",
          hasMulti: false,
          time: 1,
          active: false,
          propValueSelect: "",
          loadAnother: "",
          optsField: [],
          hasSideBtnMore: true,
          formControlName: "titulo",
        },
        {
          type: "date",
          field: "Data do Diário",
          id: "diario-date-1",
          hasMulti: false,
          time: 1,
          active: false,
          propValueSelect: "",
          loadAnother: "",
          optsField: [],
          hasSideBtnMore: false,
          formControlName: "diarioData",
        },
        {
          type: "select",
          field: "Diário",
          id: "diario-1",
          hasMulti: false,
          time: 1,
          active: false,
          propValueSelect: "",
          loadAnother: "",
          optsField: [{ value: "opt1", id: 1 }],
          hasSideBtnMore: true,
          formControlName: "diario",
        },
        {
          type: "select",
          field: "Âmbito",
          id: "ambit-1",
          hasMulti: false,
          time: 1,
          active: false,
          propValueSelect: "",
          loadAnother: "",
          optsField: [{ value: "opt1", id: 1 }],
          hasSideBtnMore: false,
          formControlName: "ambitoId",
        },
        {
          type: "number",
          field: "Nº Diário",
          id: "diario-number-1",
          hasMulti: false,
          time: 1,
          active: false,
          propValueSelect: "",
          loadAnother: "",
          optsField: [],
          hasSideBtnMore: false,
          formControlName: "diarioNumero",
        },
        {
          type: "select",
          field: "Estado",
          id: "state-1",
          hasMulti: false,
          time: 1,
          active: false,
          propValueSelect: "",
          loadAnother: "listarMunicipios",
          optsField: [{ value: "opt1", id: 1 }],
          hasSideBtnMore: false,
          formControlName: "estadoId",
        },
        {
          type: "select",
          field: "Município",
          id: "mun-1",
          hasMulti: false,
          time: 1,
          active: false,
          propValueSelect: "muniDescricao",
          loadAnother: "",
          optsField: [],
          hasSideBtnMore: false,
          formControlName: "municipioId",
        },
        {
          type: "select",
          field: "Tipo",
          id: "type-1",
          hasMulti: false,
          time: 1,
          active: false,
          propValueSelect: "",
          loadAnother: "",
          optsField: [{ value: "opt1", id: 1 }],
          hasSideBtnMore: false,
          formControlName: "tipo",
        },
        {
          type: "select",
          field: "Origem",
          id: "origin-1",
          hasMulti: false,
          time: 1,
          active: false,
          propValueSelect: "",
          loadAnother: "",
          optsField: [{ value: "opt1", id: 1 }],
          hasSideBtnMore: false,
          formControlName: "origem",
        },
        {
          type: "select",
          field: "Autoria",
          id: "autoria-1",
          hasMulti: true,
          time: 1,
          active: false,
          propValueSelect: "",
          loadAnother: "",
          optsField: [{ value: "opt1", id: 1 }],
          hasSideBtnMore: false,
          formControlName: "autoriaIds",
        },
        {
          type: "select",
          field: "Regime",
          id: "regime-1",
          hasMulti: true,
          time: 1,
          active: false,
          propValueSelect: "",
          loadAnother: "",
          optsField: [{ value: "opt1", id: 1 }],
          hasSideBtnMore: false,
          formControlName: "regimeId",
        },
      ],
    },
    {
      title: "Preencha os dados abaixo",
      fields: [
        {
          type: "select",
          field: "Interesse",
          id: "int-1",
          hasMulti: true,
          time: 1,
          active: false,
          propValueSelect: "",
          loadAnother: "",
          optsField: [{ value: "opt1", id: 1 }],
          hasSideBtnMore: false,
          formControlName: "interessesIds",
        },
        {
          type: "select",
          field: "Tema",
          id: "theme-1",
          hasMulti: false,
          time: 1,
          active: false,
          propValueSelect: "",
          loadAnother: "listarSubTema",
          optsField: [{ value: "opt1", id: 1 }],
          hasSideBtnMore: false,
          formControlName: "temaId",
        },
        {
          type: "select",
          field: "Subtema",
          id: "subtheme-1",
          hasMulti: false,
          time: 1,
          active: false,
          loadAnother: "",
          optsField: [],
          hasSideBtnMore: false,
          formControlName: "subtema",
          propValueSelect: "sudiDescricao",
        },
        {
          type: "select",
          field: "Assunto",
          id: "subject-1",
          hasMulti: true,
          time: 1,
          active: false,
          propValueSelect: "",
          loadAnother: "",
          optsField: [{ value: "opt1", id: 1 }],
          hasSideBtnMore: false,
          formControlName: "assuntoIds",
        },
        {
          type: "select",
          field: "Sindicato Impactado",
          id: "sind-impact-1",
          hasMulti: true,
          time: 1,
          active: false,
          propValueSelect: "",
          loadAnother: "",
          optsField: [{ value: "opt1", id: 1 }],
          hasSideBtnMore: false,
          formControlName: "sindicatoImpactadoIds",
        },
      ],
    },
    {
      title: "Adicione arquivos",
      fields: [
        {
          type: "upload",
          field: "Anexo",
          id: "upload-doc-1",
          hasMulti: false,
          time: 1,
          active: false,
          propValueSelect: "",
          loadAnother: "",
          optsField: [],
          hasSideBtnMore: false,
          formControlName: "anexo",
        },
      ],
    },
    {
      title: "Adicione a Ementa e o Foco",
      fields: [
        {
          type: "editor",
          field: "Ementa",
          id: "ementa-1",
          hasMulti: false,
          time: 1,
          active: false,
          propValueSelect: "",
          loadAnother: "",
          optsField: [],
          hasSideBtnMore: false,
          formControlName: "ementa",
          editorVar: "",
        },
        {
          type: "textinput",
          field: "Foco",
          id: "foco-1",
          hasMulti: false,
          time: 1,
          active: false,
          propValueSelect: "",
          loadAnother: "",
          optsField: [],
          hasSideBtnMore: false,
          formControlName: "foco",
        },
      ],
    },
    {
      title: "Relacionar Itens",
      fields: [],
    },
    {
      title: "Revise os detalhes e Finalize",
      fields: [
        {
          type: "textinput",
          field: "Título",
          id: "tit-2",
          data: "",
          formControlName: "titulo",
        },
        {
          type: "date",
          field: "Data do Diário",
          id: "dirdate-2",
          data: "",
          formControlName: "diarioData",
        },
        {
          type: "select",
          field: "Diário",
          id: "dir-2",
          data: "",
          hasMulti: false,
          time: 1,
          active: false,
          propValueSelect: "",
          loadAnother: "",
          optsField: [{ value: "opt1", id: 1 }],
          hasSideBtnMore: false,
          formControlName: "diario",
        },
        {
          type: "select",
          field: "Âmbito",
          id: "amb-2",
          data: "",
          hasMulti: false,
          time: 1,
          active: false,
          propValueSelect: "",
          loadAnother: "",
          optsField: [{ value: "opt1", id: 1 }],
          hasSideBtnMore: false,
          formControlName: "ambitoId",
        },
        {
          type: "number",
          field: "Nº Diário",
          id: "dirnum-2",
          data: "",
          optsField: [],
          hasSideBtnMore: false,
          formControlName: "diarioNumero",
        },
        {
          type: "select",
          field: "Estado",
          id: "est-2",
          data: "",
          hasMulti: false,
          time: 1,
          active: false,
          propValueSelect: "",
          loadAnother: "",
          optsField: [{ value: "opt1", id: 1 }],
          hasSideBtnMore: false,
          formControlName: "estadoId",
        },
        {
          type: "select",
          field: "Município",
          id: "mun-2",
          data: "",
          hasMulti: false,
          time: 1,
          active: false,
          propValueSelect: "",
          loadAnother: "",
          optsField: [],
          hasSideBtnMore: false,
          formControlName: "municipioId",
        },
        {
          type: "select",
          field: "Especificação do Tipo",
          id: "typespec-2",
          data: "",
          hasMulti: false,
          time: 1,
          active: false,
          propValueSelect: "",
          loadAnother: "",
          optsField: [{ value: "opt1", id: 1 }],
          hasSideBtnMore: false,
          formControlName: "tipo",
        },
        {
          type: "select",
          field: "Origem",
          id: "ori-2",
          data: "",
          hasMulti: false,
          time: 1,
          active: false,
          propValueSelect: "",
          loadAnother: "",
          optsField: [{ value: "opt1", id: 1 }],
          hasSideBtnMore: false,
          formControlName: "origem",
        },
        {
          type: "select",
          field: "Autoria",
          id: "aut-2",
          data: "",
          hasMulti: true,
          time: 1,
          active: false,
          propValueSelect: "",
          loadAnother: "",
          optsField: [{ value: "opt1", id: 1 }],
          hasSideBtnMore: false,
          formControlName: "autoriaIds",
        },
        {
          type: "select",
          field: "Regime",
          id: "reg-2",
          data: "",
          hasMulti: true,
          time: 1,
          active: false,
          propValueSelect: "",
          loadAnother: "",
          optsField: [{ value: "opt1", id: 1 }],
          hasSideBtnMore: false,
          formControlName: "regimeId",
        },
        {
          type: "select",
          field: "Interesse",
          id: "int-2",
          data: "",
          hasMulti: true,
          time: 1,
          active: false,
          propValueSelect: "",
          loadAnother: "",
          optsField: [{ value: "opt1", id: 1 }],
          hasSideBtnMore: false,
          formControlName: "interessesIds",
        },
        {
          type: "select",
          field: "Tema",
          id: "tem-2",
          data: "",
          hasMulti: false,
          time: 1,
          active: false,
          propValueSelect: "",
          loadAnother: "",
          optsField: [{ value: "opt1", id: 1 }],
          hasSideBtnMore: false,
          formControlName: "temaId",
        },
        {
          type: "select",
          field: "Subtema",
          id: "sub-2",
          data: "",
          hasMulti: false,
          time: 1,
          active: false,
          propValueSelect: "",
          loadAnother: "",
          optsField: [],
          hasSideBtnMore: false,
          formControlName: "subtema",
        },
        {
          type: "select",
          field: "Sindicato Impactado",
          id: "impsind-2",
          data: "",
          hasMulti: true,
          time: 1,
          active: false,
          propValueSelect: "",
          loadAnother: "",
          optsField: [{ value: "opt1", id: 1 }],
          hasSideBtnMore: false,
          formControlName: "sindicatoImpactadoIds",
        },
        {
          type: "select",
          field: "Assunto",
          id: "subject-2",
          data: "",
          hasMulti: true,
          time: 1,
          active: false,
          optsField: [{ value: "opt1", id: 1 }],
          hasSideBtnMore: false,
          formControlName: "assuntosIds",
        },
        {
          type: "upload",
          field: "Anexo",
          id: "anex-1",
          data: "",
          formControlName: "upload",
        },
        {
          type: "editor",
          field: "Ementa",
          id: "emen-2",
          editorVar: "",
          data: "",
          formControlName: "ementa",
        },
        {
          type: "textinput",
          field: "Foco",
          id: "foco-2",
          hasMulti: false,
          time: 1,
          active: false,
          propValueSelect: "",
          loadAnother: "",
          optsField: [],
          hasSideBtnMore: false,
          formControlName: "foco",
        },
      ],
    },
  ];

  title = "ng-forum";

  private mobileQuery: MediaQueryList;
  private fillerNavSubscription$: Subscription;

  constructor(
    protected appController: AppController,
    changeDetectorRef: ChangeDetectorRef,
    public media: MediaMatcher,
    private actions: Actions,
    private store: Store,
    protected route: ActivatedRoute,
    private spinner: NgxSpinnerService,
  ) {
    super(appController, route);
    this.setRoutesLocalStorage();

    this.mobileQuery = media.matchMedia("(max-width: 600px)");
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener("change", this._mobileQueryListener);
  }

  private _mobileQueryListener: () => void;

  ngOnInit() {
    this.appController.dipatchMobileMatches(this.mobileQuery.matches);
    this.actions
      .pipe(ofActionDispatched(AuthActions.RemoveAccess))
      .subscribe((val) => this.appController.navigate("login"));
    this.getAuth();
  }

  setRoutesLocalStorage(): void {
    this.fillerNavSubscription$ = this.appController
      .getFillerNav()
      .subscribe((routes) => {
        if (!routes) {
          const navs = this.appController.fillerNavs();
          this.store.dispatch(new AppActions.SetRouteState(navs));
        }
      });
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
    if (this.fillerNavSubscription$) this.fillerNavSubscription$.unsubscribe();
  }

  @HostListener("window:hasToken", ["$event"])
  hasAccessToken = (event) => (this.hasToken = event.detail.hasToken);

  submit(event) {
    console.log("evento: ", event);
  }

  @HostListener("window:HandleStateSpinner", ["$event"])
  handlerStateSpinner({ detail }: CustomEvent): void {
    detail.value ? this.spinner.show() : this.spinner.hide();
  }

  // @HostListener('window:HandleStateSkeleton', ['$event'])
  // handlerStateSkeleton({ detail }: CustomEvent): void {
  //   this.stateSkeleton[detail.key] = detail.value;
  // }
}
