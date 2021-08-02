import {
  Directive,
  ElementRef,
  Input,
  TemplateRef,
  ViewContainerRef,
} from "@angular/core";
import { ReleaseFeatureToggleService } from "./release-feature-toggle.service";

/**
 * @var toggleFeature: InputParam onde valor será a chave da feature que será autorizada. (Ex: enableNewCalendar)
 * @var value: InputParam onde será o valor da(s) matrícula(s) que terão autorização a feature especificada no parâmetro key.
 */
@Directive({
  selector: "[toggleFeature]",
})
export class ReleaseFeatureToggleDirective {
  constructor(
    public elfRef: ElementRef,
    private featureToggle: ReleaseFeatureToggleService,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {}

  @Input() value: string | Array<string>;

  ngOnInit(): void {}

  @Input() set key(key: string) {
    this.featureToggle.isOn(key, this.value).then((hasPermission: boolean) => {
      hasPermission
        ? this.viewContainer.createEmbeddedView(this.templateRef)
        : this.viewContainer.clear();
    });
  }
}
