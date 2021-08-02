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
 * @var matriculas: InputParam onde será o valor da(s) matrícula(s) que terão autorização a feature especificada no parâmetro key.
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

  @Input() matriculas?: string | Array<string>;
  private key: string;

  ngAfterViewInit(): void {
    Promise.resolve(null).then(() => this.validate());
  }

  validate(): void {
    if (this.key && this.matriculas) {
      this.featureToggle
        .isOn(this.key, this.matriculas)
        .then((hasPermission: boolean) => {
          hasPermission
            ? this.viewContainer.createEmbeddedView(this.templateRef)
            : this.viewContainer.clear();
        });
    }
  }

  @Input() set toggleFeature(key: string) {
    this.key = key;
  }
}
