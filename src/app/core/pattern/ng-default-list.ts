import { ColumnsTableModel } from "../../models/columns-table.model";

export abstract class NgDefaultList {
  public columnsConfig: ColumnsTableModel[] = [];

  constructor(payload: any) {
    this.checkPayload(payload);
  }

  private checkPayload(payload: any) {
    if (payload.columnsTable !== undefined && payload.columnsTable.length) {
      this.setColumnsConig(payload);
    }
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
