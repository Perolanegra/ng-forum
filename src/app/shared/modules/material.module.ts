import { NgModule } from "@angular/core";
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
// import { MatTableModule, MatInputModule, MAT_DIALOG_DATA, MatToolbarModule } from '@angular/material';
import { MatDialogRef, MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
// import { MatSidenavModule, MatIconModule, MatListModule, MatMenuModule, MatProgressSpinnerModule, MatSortModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule, MAT_DATE_LOCALE, MAT_CHIPS_DEFAULT_OPTIONS, MatChipsModule, MatDividerModule, MatTreeModule, MatProgressBarModule } from '@angular/material';
import { CdkTreeModule } from '@angular/cdk/tree';
// import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import 'moment/locale/pt-br';
import { MAT_DATE_FORMATS } from '@angular/material/core';


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
    // MatTableModule,
    // MatInputModule,
    // MatDialogModule,
    // MatToolbarModule,
    // MatSidenavModule,
    // MatIconModule,
    // MatListModule,
    // MatMenuModule,
    // MatProgressSpinnerModule,
    // MatSortModule,
    // MatSelectModule,
    // MatDatepickerModule,
    // MatNativeDateModule,
    // MatChipsModule,
    // MatDividerModule,
    CdkTreeModule,
    // MatTreeModule,
    // MatProgressBarModule
  ],
  exports: [
    CommonModule,
    // MatButtonModule,
    // MatCheckboxModule,
    // MatTableModule,
    // MatInputModule,
    // MatDialogModule,
    // MatToolbarModule,
    // MatSidenavModule,
    // MatIconModule,
    // MatListModule,
    // MatMenuModule,
    // MatProgressSpinnerModule,
    // MatSortModule,
    // MatSelectModule,
    // MatDatepickerModule,
    // MatNativeDateModule,
    // MatChipsModule,
    // MatDividerModule,
    CdkTreeModule,
    // MatTreeModule,
    // MatProgressBarModule
  ],
  providers: [
    // { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } },
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: false } },
    { provide: MatDialogRef, useValue: {} },
    // { provide: MAT_DIALOG_DATA, useValue: {} },
    // { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    // { provide: MAT_CHIPS_DEFAULT_OPTIONS, useValue: { separatorKeyCodes: [ENTER, COMMA] } },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    // { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS] },
  ]
})
export class MaterialModule {
}