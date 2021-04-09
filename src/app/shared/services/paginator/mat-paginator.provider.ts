import { Injectable } from "@angular/core";
import { MatPaginatorIntl } from "@angular/material/paginator";

@Injectable()
export class NgMatPaginatorIntl extends MatPaginatorIntl {
  itemsPerPageLabel: string = 'Items por Página';
  nextPageLabel: string = 'Avançar';
  previousPageLabel: string = 'Anterior';
  lastPageLabel: string = 'Última Página';
  firstPageLabel: string = 'Primeira Página';

  constructor() {
    super();
  }

  getRangeLabel = (page: number, pageSize: number, length: number) => {
    if (length === 0 || pageSize === 0) {
      return '0 de ' + length;
    }
    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    // If the start index exceeds the list length, do not try and fix the end index to the end.
    const endIndex = startIndex < length ?
      Math.min(startIndex + pageSize, length) :
      startIndex + pageSize;
    return startIndex + 1 + ' – ' + endIndex + ' de ' + length;
  }


  // injectTranslateService(translate: TranslateService) {
  //   this.translate = translate;

  //   this.translate.onLangChange.subscribe(() => {
  //     this.translateLabels();
  //   });

  //   this.translateLabels();
  // }

  // translateLabels() {
  //   this.itemsPerPageLabel = this.translate.instant('paginator.items_per_page');
  //   this.nextPageLabel = this.translate.instant('paginator.next_page');
  //   this.previousPageLabel = this.translate.instant('paginator.previous_page');
  // }
}
