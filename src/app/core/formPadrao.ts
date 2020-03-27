import { FormGroup, FormBuilder, FormControl, AbstractControl } from "@angular/forms";
import { ActivatedRoute, Router, Params } from "@angular/router";
import { Location } from "@angular/common"
// import { AppController } from "src/app/modules/core/appController";
import { OnInit } from "@angular/core";
import { Observable } from "rxjs";


export abstract class FormPadrao implements OnInit {

    //Forumlario que o usuário preencherá
    private _form: FormGroup;
    public mensagensValidacao:{[key:string]:any};

    constructor(protected formBuilder: FormBuilder,
        route: ActivatedRoute,
        router: Router,
        protected location: Location) {


        this.form = this.criarCadForm();
        this._form.addControl("continuarCadastrando", new FormControl(false));
        this.mensagensValidacao = this.criarMensagensValidacao();      

    }

    abstract criarCadForm(): FormGroup;

    abstract criarMensagensValidacao():{[key:string]:any};

    abstract cadastrar():Observable<any>;

    abstract preencherCadFormInsercao(pParams: Params);


    ngOnInit() {
       
    }
    

    preencherCadFormAlteracao(pRegistro: any) {
        
        let lValores = {}
        this.formControls.reset;
        Object.keys(this.formControls).forEach(key => {
            
            if (pRegistro[key]!=null && pRegistro[key]!=undefined) {
                
                let lValor = pRegistro[key];              
               
               
                lValores[key] = lValor;
            }
        });
        
        this.form.patchValue(lValores, { emitEvent: false });
    }


    voltar() {
        this.location.back();
    }

    //Metodo que mostra o nome do objeto no autocomplete
    obterNomeItem(pItem) {
        return pItem ? pItem.nome : undefined;
    }

    public get form() {
        return this._form;
    }

    public set form(pAtualizacao) {
        this._form = pAtualizacao;
    }


    get formControls():{[key:string]:AbstractControl} 
    { 
        return this.form.controls; 
    }


    confirmar() {
        // try {

        //     if (this.validarForm(this.form)) {
        //         this.cadastrar().subscribe(
        //             pResp=>{this.exibirSucesso()},
        //             pError=>{this.appController.tratarErro(pError);
        //             })
                
        //     } else {
        //         this.appController.exibirErro("Existem campos preenchidos incorretamente.");
        //     }
        // } catch (err) {
        //     this.appController.tratarErro(err);
        // }


    }


}