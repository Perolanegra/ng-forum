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

  @Output() add = new EventEmitter<boolean>();
  @Output() delete = new EventEmitter<boolean>();
  @Output() edit = new EventEmitter<boolean>();
  @Output() update = new EventEmitter<boolean>();

  @Input() hasOptionsBtn: boolean = true;
  @Input() hasInsertBtn: boolean = true;
  @Input() hasRemoveBtn: boolean = true;
  @Input() hasModifyBtn: boolean = true;
  @Input() hasUpdateBtn: boolean = true;

  insertData = () => this.add.emit(true);

  removeData = () => this.delete.emit(true);

  modifyData = () => this.edit.emit(true);

  updateData = () => this.update.emit(true);

  get dataNumber(): string {
    if (this.dataSource.length) {
      return this.dataSource.length >= 1
        ? this.dataSource.length + " registro(s)"
        : "<<Nenhum registro encontrado>>";
    }

    return "<<Filtro Pendente>>";
  }
  
}
