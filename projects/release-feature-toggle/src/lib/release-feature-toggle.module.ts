import { NgModule } from "@angular/core";
import { ReleaseFeatureToggleDirective } from "./release-feature-toggle.directive";
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [ReleaseFeatureToggleDirective],
  imports: [HttpClientModule],
  exports: [ReleaseFeatureToggleDirective],
})
export class ReleaseFeatureToggleModule {}
