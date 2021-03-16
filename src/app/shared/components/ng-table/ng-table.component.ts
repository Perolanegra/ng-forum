import { Component, ViewChild, OnInit, Input, SimpleChanges, OnChanges, ChangeDetectionStrategy } from "@angular/core";
import { SelectionModel } from "@angular/cdk/collections";
import { Output } from "@angular/core";
import { EventEmitter } from "@angular/core";
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TableOrder } from '../../../core/enum/order.enum';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'ng-table',
  templateUrl: './ng-table.component.html',
  styleUrls: ['./ng-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent implements OnInit, OnChanges {
  @ViewChild(MatSort) sort: MatSort;

  /**Outputs Table */
  @Output() insert = new EventEmitter<any>();
  @Output() remove = new EventEmitter<any>();
  @Output() edit = new EventEmitter<any>();
  @Output() update = new EventEmitter<any>();
  @Output() rowClicked = new EventEmitter<any>();
  @Output() paginateRequest = new EventEmitter<number>();

  /**Inputs Table */
  @Input() hasUpdateBtn: boolean = true;
  @Input() hasRemoveBtn: boolean = true;
  @Input() hasInsertBtn: boolean = true;
  @Input() hasModifyBtn: boolean = true;
  @Input() hasOptionsBtn: boolean = true;
  @Input() columnsConfig = [];
  @Input() checkboxVisible: boolean = false;
  @Input() data: any | MatTableDataSource<any>;
  @Input() height: string = '60vh';
  @Input() orderByColumn: string;
  @Input() direction: TableOrder.ASC | TableOrder.DESC;
  @Input() tagColors: string;

  /** Vars */
  public pageSlice = [];
  private _selection: SelectionModel<any>;
  displayedColumns = [];
  private nextPaginate = 15;

  constructor() { }

  ngOnInit(): void {
    this.displayedColumns = this.columnsConfig.map(c => c.name);
    this.checkboxVisible ? this.displayedColumns.unshift('select') : '';
  }

  add = () => this.insert.emit(true);

  delete = () => this.remove.emit(this.selection);

  modify = () => this.edit.emit(this.selection);

  upDate = () => this.update.emit(true);

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.data) {
      this.feedTable();
    }
  }

  feedTable() {
    if (this.data) {
      this.data = new MatTableDataSource(this.data);
      this.data.sortingDataAccessor = (obj, property) => this.getProperty(obj, property);
      this.data.sort = this.sort;
      this.pageSlice = this.data.data.slice(0, 5);
      this.selection.clear();
      this.styleTagBorder();
    }
  }

  getProperty = (obj, property) => (property.split('.').reduce((o, p) => o && o[p], obj));

  //Quando é afetuado um click na linha ele captura a linha e direciona para tela de edição passando o ID da mesma
  onRowClicked(row) {
    this.rowClicked.emit(row.id);
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

  paginate(event: PageEvent): void {
    const result = event.pageSize * (event.pageIndex + 1);
    if (event.pageSize === 15 || result >= 15) { // talvez de uma bugada.
      this.paginateRequest.emit(this.nextPaginate += 15);
    }

    let startIndex, endIndex;

    startIndex = event.pageIndex;
    endIndex = event.pageSize;

    if (event.pageIndex > 0) {
      startIndex = event.pageSize;
      endIndex = startIndex + event.pageSize;
    }

    if (endIndex > this.data.data.length) endIndex = this.data.data.length;

    this.pageSlice = this.data.data.slice(startIndex, endIndex);
  }

  styleTagBorder(): void {
    this.pageSlice.forEach((data: any) => {
      (data.tag_colors as string).split(",").forEach((color: string, index: number) => {
        document.styleSheets[0].addRule(
          `a.tag.borderTag${index + (data.tags.split(",")[index] as string).toLowerCase()}:after`,
          `border-left-color: ${color};`
        );
      })
    });
  }
}