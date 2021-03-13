import { ColumnsTableModel } from "../../models/columns-table.model";
import { ActivatedRoute, Data } from "@angular/router";
import { NgDefault } from "./ng-default";
import { AppController } from "../appController";

export abstract class NgDefaultList extends NgDefault {
  public columnsConfig: ColumnsTableModel[] = [];
  public data: any;

  constructor(
    protected route: ActivatedRoute,
    protected appController: AppController,
    payload?: any
  ) {
    super(appController);
    this.checkPayloadColumnsConfig(payload);
  }

  private checkPayloadColumnsConfig(payload: any): void {
    if (
      payload &&
      payload.columnsTable !== undefined &&
      payload.columnsTable.length
    ) {
      this.setColumnsConig(payload);
    }
  }

  setDataResolver(resolverParam: string): void {
    this.route.data.subscribe((data: Data) => {
      this.data = data[resolverParam];
    });
  }

  /**
   *
   * @param payload param objeto que contém duas propriedades, sendo a 1ª
   * columnsTable, que é um array de string dos nomes das colunas, em ordem, e a 2ª
   * classes: que é o objeto que representa a classe aplicada em cada coluna, seguindo a
   * respectiva estrutura de dados: { nome_da_coluna1: ['classe1', 'classe2'], nome_da_coluna2: ['classe1'] }...
   * @description tem como objetivo montar o array de objetos columnsConfig referente ao model ColumnsTableModel.
   * @author igor.silva
   * @returns void
   */
  private setColumnsConig(payload: {
    columnsTable: string[];
    classes: any;
  }): void {
    const { columnsTable, classes } = payload;
    columnsTable.forEach((column: string, index: number) => {
      this.columnsConfig.push({
        name: column,
        title: this.capitalizeFirstLetter(column as any),
        cell: (data: any) => this.getHtml({ col: index + 1, data }),
        classes: classes[column],
      });
    });
  }

  capitalizeFirstLetter = ([first, ...rest], locale = navigator.language) =>
    first.toLocaleUpperCase(locale) + rest.join("");

  abstract getHtml(payload: any): string;
}
