import { Component, Input, EventEmitter, Output } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";

@Component({
  selector: "ng-table-header",
  templateUrl: "./table-header.component.html",
  styleUrls: ["./table-header.component.scss"],
})
export class TableHeaderComponent {
  constructor() {}
  @Input() public dataSource: MatTableDataSource<any> | any;
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

  insert = () => this.inserir.emit(true);

  remove = () => this.excluir.emit(true);

  edit = () => this.alterar.emit(true);

  update = () => this.atualizar.emit(true);

  get dataNumber(): string {
    if (this.dataSource && this.dataSource.data.length) {
      return this.dataSource.data.length >= 1
        ? this.dataSource.data.length + " registro(s)"
        : "<<Nenhum registro encontrado>>";
    }

    return "<<Filtro Pendente>>";
  }

  get dataNumberSelected(): string {
    return this.selection.selected.length + " selecionado(s)";
  }
}
