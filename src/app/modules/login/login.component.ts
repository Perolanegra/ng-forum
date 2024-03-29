import {
  Component,
  OnInit,
  ElementRef,
  OnDestroy,
  ChangeDetectionStrategy,
} from "@angular/core";
import { FormBuilder, Validators, FormControl } from "@angular/forms";
import { Store, Select } from "@ngxs/store";
import { AuthActions } from "src/app/state/auth/auth.actions";
import { EncryptionService } from "src/app/core/encryption.service";
import { AppController } from "src/app/core/appController";
import { ForgetPasswordComponent } from "src/app/modules/login/dialogs/forget-password/forget-password.component";
import { AuthState } from "src/app/state/auth/auth.state";
import { Observable, Subscription } from "rxjs";
import { NgForm } from "src/app/core/ng-form";
import { CustomValidators } from "src/app/shared/validators/custom-validators";
@Component({
  selector: "ng-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent extends NgForm implements OnInit, OnDestroy {
  @Select(AuthState.hasResetPass) hasResetPass$: Observable<boolean>;

  public hasResetPassSubscription$: Subscription;

  constructor(
    protected formBuilder: FormBuilder,
    private store: Store,
    protected appController: AppController,
    private encryptService: EncryptionService
  ) {
    super(formBuilder, appController, false);
  }
  ngOnInit(): void {
    this.setForm();
    this.setResetPass();
    this.setErrorValidation();
  }

  ngOnDestroy(): void {
    this.hasResetPassSubscription$
      ? this.hasResetPassSubscription$.unsubscribe()
      : null;
  }

  setResetPass(): void {
    this.hasResetPass$.subscribe((hasResetPass) => {
      if (hasResetPass)
        setTimeout(
          () => this.store.dispatch(new AuthActions.RemoveHasReset()),
          420000
        ); // 7min p fzr outra requisição.
    });
  }

  setErrorValidation(): void {
    const pass_msg = this.getErrorMessages(4, true);
    const pass_type = this.getErrorTypes(3, true);

    const username_msg = this.setErrorsValidation([0, 4, 6], "M");
    const username_type = this.setErrorsValidation([0, 1, 5], "T");

    this.setErrorMsgs("username", username_type, username_msg);
    this.setErrorMsgs("password", pass_type, pass_msg);
  }

  setForm(): void {
    this._form.addControl(
      "username",
      new FormControl(null, [Validators.required, CustomValidators.allblank])
    );
    this._form.addControl(
      "password",
      new FormControl(null, [Validators.required, CustomValidators.whitespace])
    );
    this.setInitControlsPadding();
  }

  submit(): void {
    const password = this.formControls.password.value as string;
    if (this.isValidForm(password?.length)) {
      this.appController.triggerCustomEvent("HandleStateSpinner", {
        value: true,
      });
      const username = this.formControls.username.value as string;
      const encrypted = this.encryptService.set(
        "10610433IA$#@$^@1ERF",
        password
      );
      this.store
        .dispatch(new AuthActions.Signin(username, encrypted))
        .subscribe((state: any) => {
          if (state.auth.token) {
            this.appController.setMenuActiveLink("issues");
            this.appController.navigate("issues");
            this.appController.triggerCustomEvent("HandleStateSpinner", {
              value: false,
            });
          }
        });
      this._form.reset();
      this.stateSubmitHasChanged();
    }
  }

  // A validação minlength nesse componente não é um erro, é uma informação obrigatória.
  public isValidForm(passLength: number): boolean {
    return passLength < 8 ? false : (this.hasClickSubmit = this._form.valid);
  }

  openForgotPass(): void {
    this.appController.showToastPopUp({ style: {} }, ForgetPasswordComponent);
  }

  onClickSignUp(target: ElementRef<any>): void {
    this.appController.setElementClass(target, "btn-sign-up--clicked");
    document.querySelectorAll("span").forEach((element: any) => {
      this.appController.setElementClass(element, "expanded");
    });
    setTimeout(() => this.appController.navigate("sign-up"), 1000);
  }

  public getResponse() {
    throw new Error("Method not implemented.");
  }

  public fillForm() {
    throw new Error("Method not implemented.");
  }
}
