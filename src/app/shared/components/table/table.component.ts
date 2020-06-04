import { Component, ViewChild, OnInit, Input, SimpleChanges, OnChanges, ChangeDetectionStrategy } from "@angular/core";
import { SelectionModel } from "@angular/cdk/collections";
import { Output } from "@angular/core";
import { EventEmitter } from "@angular/core";
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'ng-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent implements OnInit, OnChanges {
  private _selection: SelectionModel<any>;
  displayedColumns = [];

  @Output() inserir = new EventEmitter<any>();
  @Output() excluir = new EventEmitter<any>();
  @Output() alterar = new EventEmitter<any>();
  @Output() atualizar = new EventEmitter<any>();
  @Output() rowClicked = new EventEmitter<boolean>();
  @Input() botaoAtualizarVisivel: boolean = true;
  @Input() botaoExcluirVisivel: boolean = true;
  @Input() botaoInserirVisivel: boolean = true;
  @Input() botaoAlterarVisivel: boolean = true;
  @Input() botaoOpcoesVisivel: boolean = true;
  @Input() colunasConfig = [];
  @Input() checkboxVisivel: boolean = true;
  @Input() registros;
  @Input() height:string='60vh';
  @ViewChild(MatSort) sort: MatSort;
  @Input() ordenaColuna: string;
  @Input() direcao:string = "asc";
  
  constructor() {  }
  
  ngOnInit(): void {
    this.displayedColumns = this.colunasConfig.map(c => c.nome);
    this.checkboxVisivel ?? this.displayedColumns.unshift('select');
  }

  inserirClick() {
    this.inserir.emit(true);
  }

  excluirClick() {
    this.excluir.emit(this.selection);
  }

  alterarClick() {
    this.alterar.emit(this.selection);
  }

  atualizarClick() {
    this.atualizar.emit(true);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.registros) {
      this.popularTabela();
    }
  }

  popularTabela() {
    if(this.registros){
      this.registros = new MatTableDataSource(this.registros);
      this.registros.sortingDataAccessor = (obj, property) => this.getProperty(obj, property);
      this.registros.sort = this.sort;
      this.selection.clear();
    }
  }

  getProperty = (obj, property) => (property.split('.').reduce((o, p) => o && o[p], obj));

  //Quando é afetuado um click na linha ele captura a linha e direciona para tela de edição passando o ID da mesma
  onRowClicked(row) {
    if (this.checkboxVisivel) {
      this.rowClicked.emit(row);
    }
  }

  checkBoxClicked(row) {
    this.selection.toggle(row);
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.registros.data.length;
    return numSelected === numRows;
  }
  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ? this.selection.clear() : this.registros.data.forEach(row => this.selection.select(row));
  }

  get selection() {
    return this._selection ? this._selection : this._selection = new SelectionModel<any>(true, []);
  }

  @Input() set selection(pSelection) {
    this._selection = pSelection;
  }
}