import { Component, ViewChild, OnInit, Input, SimpleChanges, OnChanges, ChangeDetectionStrategy } from "@angular/core";
import { SelectionModel } from "@angular/cdk/collections";
import { Output } from "@angular/core";
import { EventEmitter } from "@angular/core";
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TableOrder } from '../../../core/enum/order.enum';

@Component({
  selector: 'ng-table',
  templateUrl: './ng-table.component.html',
  styleUrls: ['./ng-table.component.scss'],
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
  @Input() columnsConfig = [];
  @Input() checkboxVisible: boolean = false;
  @Input() data: any | MatTableDataSource<any>;
  @Input() height:string='60vh';
  @ViewChild(MatSort) sort: MatSort;
  @Input() orderByColumn: string;
  @Input() direction: TableOrder.ASC | TableOrder.DESC;
  
  constructor() {  }
  
  ngOnInit(): void {
    this.displayedColumns = this.columnsConfig.map(c => c.name);
    this.checkboxVisible ? this.displayedColumns.unshift('select') : '';
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
    if (changes.data) {
      this.popularTabela();
    }
  }

  popularTabela() {
    if(this.data){
      this.data = new MatTableDataSource(this.data);
      this.data.sortingDataAccessor = (obj, property) => this.getProperty(obj, property);
      this.data.sort = this.sort;
      this.selection.clear();
    }
  }

  getProperty = (obj, property) => (property.split('.').reduce((o, p) => o && o[p], obj));

  //Quando é afetuado um click na linha ele captura a linha e direciona para tela de edição passando o ID da mesma
  onRowClicked(row) {
    // console.log('row: ', row);
    // this.rowClicked.emit(row);
  }

  checkBoxClicked(row) {
    this.selection.toggle(row);
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const qtdSelected = this.selection.selected.length;
    const qtdRows = this.data.data.length;
    return qtdSelected === qtdRows;
  }
  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ? this.selection.clear() : this.data.data.forEach(row => this.selection.select(row));
  }

  get selection() {
    return this._selection ? this._selection : this._selection = new SelectionModel<any>(true, []);
  }

  @Input() set selection(pSelection) {
    this._selection = pSelection;
  }
}