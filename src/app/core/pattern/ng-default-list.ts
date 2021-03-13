import { ColumnsTableModel } from "../../models/columns-table.model";
import { ActivatedRoute, Data } from '@angular/router';

export abstract class NgDefaultList {
  public columnsConfig: ColumnsTableModel[] = [];
  public dataTable: any;

  constructor(protected route: ActivatedRoute, payload?: any) {
    this.checkPayload(payload);
  }

  private checkPayload(payload: any): void {
    if (payload && payload.columnsTable !== undefined && payload.columnsTable.length) {
      this.setColumnsConig(payload);
    }
  }

  setDataTableResolver(resolverParam: string): void {
    this.route.data
    .subscribe((data: Data) => {
      this.dataTable = data[resolverParam];
    });
  }

  private setColumnsConig(payload: { columnsTable: string[]; classes: any }) {
    const { columnsTable, classes } = payload;
    columnsTable.forEach((column: string, index: number) => {
      this.columnsConfig.push({
        name: column,
        title: this.capitalizeFirstLetter(column as any),
        cell: (data: any) => this.getHtml({ col: index+1,  data }),
        classes: classes[column]
      });
    });
  }

  capitalizeFirstLetter = ([first, ...rest], locale = navigator.language) =>
    first.toLocaleUpperCase(locale) + rest.join("");

  abstract getHtml(payload: any): string;
}
