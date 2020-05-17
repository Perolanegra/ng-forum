import { Component, Input, EventEmitter, Output } from "@angular/core";

@Component({
    selector: 'ng-table-header',
    templateUrl: './table-header.component.html',
    styleUrls: ['./table-header.component.scss']
})
export class TableHeaderComponent {
    constructor(){}
    @Input() dataSource;
    @Input() selection;
    @Input() qtdSelecionados;

    @Output() inserir = new EventEmitter<boolean>();
    @Output() excluir = new EventEmitter<boolean>();
    @Output() alterar = new EventEmitter<boolean>();
    @Output() atualizar = new EventEmitter<boolean>();

    @Input() botaoOpcoesVisivel: boolean = true;
    @Input() botaoInserirVisivel: boolean = true;
    @Input() botaoExcluirVisivel: boolean = true;
    @Input() botaoAlterarVisivel: boolean = true;
    @Input() botaoAtualizarVisivel: boolean = true;

    inserirClick() {
        this.inserir.emit(true);
    }

    excluirClick() {
        this.excluir.emit(true);
    }

    alterarClick() {
        this.alterar.emit(true);
    }

    atualizarClick() {
        this.atualizar.emit(true);
    }


    get textoRegistros(){
        if(this.dataSource==undefined || this.dataSource.data==undefined || this.dataSource.data==null){
            return "<<Filtro Pendente>>";
        }else{
            if(this.dataSource.data.length==1){
                return "1 registro";
                
            }else{
                if(this.dataSource.data.length>1){
                    return this.dataSource.data.length+" registros";
                    
                }else{
                    return "<<Nenhum registro encontrado>>";
                }
            }


        }


    }

    get textoSelecionados(){
        if(this.selection.selected.length>1){
            return this.selection.selected.length + " selecionados";
        }
        if(this.selection.selected.length==1){
            return "1 selecionado";
        }
        return "nenhum selecionado"
    }

}