import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Store, Select } from '@ngxs/store';
import { AuthActions } from 'src/app/state/auth/auth.actions';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription, Observable } from 'rxjs';
import { AuthState } from 'src/app/state/auth/auth.state';
import { AppController } from 'src/app/core/appController';
import { ToastComponent } from 'src/app/shared/components/toast/toast.component';
import { CustomValidators } from 'src/app/shared/validators/custom-validators';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  @Select(AuthState.resetPassResponse) rPassResponse$: Observable<any>;
  private rPassResponseSubscription$: Subscription;

  public resetForm: FormGroup;
  public hasClickSubmit: boolean = false;
  hasMobileMatches = false;
  public errorMsgs;

  constructor(private formBuilder: FormBuilder,
    private store: Store,
    private spinner: NgxSpinnerService,
    public appController: AppController) { }

  ngOnInit(): void {
    this.resetForm = this.formBuilder.group({
      new_password: new FormControl(null, [Validators.required, CustomValidators.whitespace]),
      verify_password: new FormControl(null, [Validators.required, CustomValidators.whitespace]),
    });

    this.getResponse();
    this.getErrorValidation();
  }

  ngOnDestroy() {
    this.rPassResponseSubscription$.unsubscribe();
  }

  getResponse() {
    this.rPassResponseSubscription$ = this.rPassResponse$.subscribe(async (data) => {
      if (data) {
        this.spinner.hide();
        this.appController.showToastPopUp(data, ToastComponent);
      }
    });
  }

  submit(): void {
    if (this.resetForm.valid) {
      this.hasClickSubmit = this.resetForm.valid;
      this.spinner.show();
      this.store.dispatch(new AuthActions.ResetPass(this.resetForm.get('verify_password').value));
      this.resetForm.reset();
      setTimeout(() => this.hasClickSubmit = !this.hasClickSubmit, 2000);
    }
  }

  public getStyle(trueValue, falseValue) {
    return this.hasMobileMatches ? trueValue : falseValue;
  }

  getErrorValidation(): void {
    const types = ['required', 'minlength', 'whitespace'];
    const msgs = ['O campo é obrigatório.', 'Mínimo de 8 caracteres.', 'Não pode conter espaços em branco.']
    const { new_password } = this.appController.getErrorValidation('new_password', types, msgs);
    const { verify_password } = this.appController.getErrorValidation('verify_password', types, msgs);

    this.errorMsgs = { new_password, verify_password };
  }

}
