import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { MaterialModule } from "./material/material.module";
import { FormComponent } from "./components/form/form.component";
import { ToastComponent } from "./components/toast/toast.component";
import { AppOverBtnDirective } from "../core/app-over-btn.directive";
import { NgInputErrorComponent } from "./components/ng-input-error/ng-input-error.component";
import { SafeHtmlPipe } from "./pipes/safeHtml.pipe";
import { TableHeaderComponent } from "./components/table-header/table-header.component";
import { TableComponent } from "./components/ng-table/ng-table.component";
import { NgxSkeletonLoaderModule } from "ngx-skeleton-loader";
import { ConfirmDialogComponent } from "./components/confirm-dialog/confirm-dialog.component";
import { NgxMaterialTimepickerModule } from "ngx-material-timepicker";
import { MatIconModule } from "@angular/material/icon";
@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    ReactiveFormsModule,
    NgxSkeletonLoaderModule,
    NgxMaterialTimepickerModule,
    MatIconModule,
    // MatAutocompleteModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    FormComponent,
    ToastComponent,
    AppOverBtnDirective,
    NgInputErrorComponent,
    TableComponent,
    TableHeaderComponent,
    SafeHtmlPipe,
    ConfirmDialogComponent,
  ],
  exports: [
    FormComponent,
    NgInputErrorComponent,
    MaterialModule,
    ReactiveFormsModule,
    NgxSkeletonLoaderModule,
    NgxMaterialTimepickerModule,
    TableComponent,
    TableHeaderComponent,
    SafeHtmlPipe,
    MatIconModule,
  ],
  entryComponents: [ToastComponent, ConfirmDialogComponent],
})
export class SharedModule {}
