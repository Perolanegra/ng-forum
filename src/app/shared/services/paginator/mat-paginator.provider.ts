import { Injectable } from "@angular/core";
import { MatPaginatorIntl } from "@angular/material/paginator";

@Injectable()
export class NgMatPaginatorIntl extends MatPaginatorIntl {
  itemsPerPageLabel: string = 'Items por Página';
  nextPageLabel: string = 'Avançar';
  previousPageLabel: string = 'Anterior';
  lastPageLabel: string = 'Última Página';
  firstPageLabel: string = 'Primeira Página';
  
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
