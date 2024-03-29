import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnDestroy,
} from "@angular/core";
import { AppController } from "src/app/core/appController";
import { NgRichTextEditorComponent } from "./ng-text-editor/ng-text-editor.component";
import { FormBuilder, FormControl, Validators } from "@angular/forms";
import { NgForm } from "src/app/core/ng-form";
import { trigger } from "@angular/animations";
import { CustomValidators } from "src/app/shared/validators/custom-validators";
import { ConfirmDialogComponent } from "src/app/shared/components/confirm-dialog/confirm-dialog.component";
import { AddSurveyDialogComponent } from "./add-survey-dialog/add-survey-dialog.component";
import { Subscription, Observable } from "rxjs";
import { Store } from "@ngxs/store";
import { IssueActions } from "src/app/state/issue/issue.actions";
import { BtnSubmitState } from "src/app/animations/btnSubmitState";
import { RemoveIconState } from "src/app/animations/removeIconState";
import { AddPollIssueModel } from "src/app/models/add-poll-issue.model";
import { AddContextIssueModel } from "src/app/models/add-context-issue.model";
import { AuthState } from "src/app/state/auth/auth.state";
import { UserModel } from "src/app/models/user.model";
import { ActivatedRoute } from "@angular/router";
import { CanComponentDeactivate } from "src/app/shared/guards/can-deactivate.guard";
import { SelectSnapshot } from "@ngxs-labs/select-snapshot";

@Component({
  selector: "ng-add-issue",
  templateUrl: "./add-issue.component.html",
  styleUrls: ["./add-issue.component.scss"],
  animations: [
    // Angular Animations
    trigger("btnSubmitState", BtnSubmitState),
    trigger("removeIconState", RemoveIconState),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddIssueComponent
  extends NgForm
  implements OnInit, OnDestroy, CanComponentDeactivate {
  @SelectSnapshot(AuthState.userDetails) user: UserModel;

  public stateBtnSubmit: string = "disabled";
  public stateIconAddContent: string = "disabled";
  public stateIconAddSurvey: string = "disabled";
  public tagListMock;
  private count = 0;

  protected contentAfterClosedSubscription$: Subscription;
  protected removeContentSubscription$: Subscription;
  protected formValueChangesSubscription$: Subscription;

  constructor(
    protected appController: AppController,
    protected formBuilder: FormBuilder,
    private ref: ChangeDetectorRef,
    private store: Store,
    protected route: ActivatedRoute
  ) {
    super(formBuilder, appController, false, route);
  }

  canDeactivate(): boolean | Observable<boolean> | Promise<boolean> {
    // lógica pra ele sair do component caso ele clique errado e faça uma navegação.
    return true;
  }

  ngOnInit(): void {
    this.setForm();
    this.setErrorValidation();
    this.formValueChangesSubscription$ = this._form.valueChanges
      .pipe()
      .subscribe((formEmitted) => {
        formEmitted
          ? (this.stateBtnSubmit = this._form.valid ? "enabled" : "disabled")
          : null;
      });
  }

  ngOnDestroy() {
    if (this.removeContentSubscription$)
      this.removeContentSubscription$.unsubscribe();
    if (this.contentAfterClosedSubscription$)
      this.contentAfterClosedSubscription$.unsubscribe();
    if (this.formValueChangesSubscription$)
      this.formValueChangesSubscription$.unsubscribe();
  }

  public async submittedValid(): Promise<void> {
    const payload = this.setPayload();
    this.store.dispatch(new IssueActions.Add(payload));
    this._form.reset();
    this.appController.navigate("issues");
  }

  private setPayload(): AddContextIssueModel | AddPollIssueModel {
    const payload = {
      issue: { author: this.user.username, ...this._form.value },
    } as AddContextIssueModel | AddPollIssueModel;
    return payload;
  }

  addContent(componentId: string): void {
    const componentObj = {
      1: NgRichTextEditorComponent,
      2: AddSurveyDialogComponent,
    };
    const dialogRef = this.appController.showToastPopUp(
      {
        style: {},
        value: this._form.value.content,
        count: this.count,
      },
      componentObj[Number(componentId)]
    );

    if (componentId === "1" && this.count < 1) {
      this.count++;
    }

    this.contentAfterClosedSubscription$ = dialogRef
      .afterClosed()
      .subscribe((data: JSON) => {
        if (data) {
          this._form.get("content").setValue(data);
          componentId === "1"
            ? (this.stateIconAddContent = "enabled")
            : (this.stateIconAddSurvey = "enabled");
          this.ref.markForCheck();
        }
      });
  }

  setErrorValidation(): void {
    // lembrando que tem que ser na ordem, type - msg
    const title_type = this.getErrorTypes(2, true);
    const title_msg = this.getErrorMessages(2, true);

    const subtitle_type = this.getErrorTypes(2, true, 3);
    const subtitle_msg = this.getErrorMessages(2, true, 4, 10);

    this.setErrorMsgs("title", title_type, title_msg);
    this.setErrorMsgs("subtitle", subtitle_type, subtitle_msg);
  }

  setForm(): void {
    this._form.addControl(
      "title",
      new FormControl(null, [Validators.required, CustomValidators.allblank])
    );
    this._form.addControl(
      "subtitle",
      new FormControl(null, [Validators.required, CustomValidators.allblank])
    );
    this._form.addControl(
      "id_tags",
      new FormControl(null, [Validators.required])
    );
    this._form.addControl(
      "content",
      new FormControl(null, [Validators.required])
    );
    this._form.addControl("typeSurveyContent", new FormControl(false));
    this.setInitControlsPadding();
  }

  public fillForm(): any {
    throw new alert('no method available')
  }

  confirmRemoveContent() {
    // chamar popup de confirmação passando dinamicamente a mensagem de pergunta e as opções.
    const title = "Atenção";
    const message = "Você realmente quer remover todo o conteúdo?";
    const type = "warning";
    const style = {};
    const dialogRef = this.appController.showToastPopUp(
      { title, message, type, style },
      ConfirmDialogComponent
    );

    this.removeContentSubscription$ = dialogRef
      .afterClosed()
      .subscribe((dataEmitted) => {
        if (dataEmitted) {
          this._form.get("content").setValue("");
          this.stateIconAddContent = "disabled";
          this.stateIconAddSurvey = "disabled";
          this.ref.markForCheck();
        }
      });
  }

  public getResponse() {
    throw new Error("Method not implemented.");
  }
}
