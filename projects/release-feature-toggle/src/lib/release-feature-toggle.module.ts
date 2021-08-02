import { NgModule, ModuleWithProviders } from "@angular/core";
import { ReleaseFeatureToggleDirective } from "./release-feature-toggle.directive";
import { HttpClientModule } from "@angular/common/http";
import { ReleaseFeatureToggleService } from "./release-feature-toggle.service";
@NgModule({
  declarations: [ReleaseFeatureToggleDirective],
  imports: [HttpClientModule],
  exports: [ReleaseFeatureToggleDirective],
})
export class ReleaseFeatureToggleModule {
  public static forRoot(
    environment: any
  ): ModuleWithProviders<ReleaseFeatureToggleModule> {
    return {
      ngModule: ReleaseFeatureToggleModule,
      providers: [
        ReleaseFeatureToggleService,
        {
          provide: "env", // you can also use InjectionToken
          useValue: environment,
        },
      ],
    };
  }
}
