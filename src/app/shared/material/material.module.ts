import { NgModule } from "@angular/core";
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogRef, MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { CdkTreeModule } from '@angular/cdk/tree';
import { MAT_DATE_FORMATS, DateAdapter, MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { MAT_CHIPS_DEFAULT_OPTIONS, MatChipsModule } from '@angular/material/chips';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list'
import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatRippleModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatPaginatorModule, MatPaginatorIntl } from '@angular/material/paginator';
import { NgMatPaginatorIntl } from '../services/paginator/mat-paginator.provider';
import { MatTooltipModule } from '@angular/material/tooltip';

export const MY_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MM YYYY',
    dateA11yLabel: 'DD/MM/YYYY',
    monthYearA11yLabel: 'MM YYYY',
  },
};

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatCheckboxModule,
    MatTableModule,
    MatInputModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatChipsModule,
    MatDividerModule,
    CdkTreeModule,
    MatRippleModule,
    MatSlideToggleModule,
    MatPaginatorModule,
    MatTooltipModule
    // MatTreeModule,
    // MatProgressBarModule
  ],
  exports: [
    CommonModule,
    MatButtonModule,
    MatCheckboxModule,
    MatTableModule,
    MatInputModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatChipsModule,
    MatDividerModule,
    CdkTreeModule,
    MatRippleModule,
    MatSlideToggleModule,
    MatPaginatorModule,
    MatTooltipModule
    // MatTreeModule,
    // MatProgressBarModule
  ],
  providers: [
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } },
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: false } },
    { provide: MatDialogRef, useValue: {} },
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    { provide: MAT_CHIPS_DEFAULT_OPTIONS, useValue: { separatorKeyCodes: [ENTER, COMMA] } },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS] }, ,
    {
      provide: MatPaginatorIntl,
      useFactory: (translate) => {
        const service = new NgMatPaginatorIntl();
        // service.injectTranslateService(translate);
        return service;
      },
      // deps: [TranslateService]
    }
  ]

})
export class MaterialModule { }