import { NgModule } from "@angular/core";
import { DinamicFormInputsComponent } from "./dinamic-form-inputs.component";
import { MaterialModule } from "./material.module";

@NgModule({
  declarations: [DinamicFormInputsComponent],
  imports: [MaterialModule],
  exports: [DinamicFormInputsComponent],
})
export class DinamicFormInputsModule {}
