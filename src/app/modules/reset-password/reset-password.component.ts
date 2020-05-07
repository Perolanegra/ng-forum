import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, ValidationErrors } from '@angular/forms';
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
  public hide1 = true;
  public hide2 = true;

  @Select(AuthState.resetPassResponse) rPassResponse$: Observable<any>;
  private rPassResponseSubscription$: Subscription;

  public resetForm: FormGroup;
  public hasClickSubmit: boolean = false;
  public hasMobileMatches = false; // recuperar esse kra
  public errorMsgs;

  constructor(private formBuilder: FormBuilder,
    private store: Store,
    private spinner: NgxSpinnerService,
    public appController: AppController) { }

  ngOnInit(): void {
    this.resetForm = this.formBuilder.group({
      new_password: new FormControl(null, [Validators.required, CustomValidators.whitespace]),
      verify_password: new FormControl(null, Validators.compose([Validators.required, CustomValidators.whitespace, this.matchValues.bind(this)])),

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
    let types = ['required', 'minlength', 'whitespace'];
    let msgs = ['O campo é obrigatório.', 'Mínimo de 8 caracteres.', 'Não pode conter espaços em branco.']

    let msgAux = [], typesAux = [];
    msgAux.push(...msgs); msgAux.push('Senhas não coincidem.');
    typesAux.push(...types); typesAux.push('matchValues');

    const { new_password } = this.appController.getErrorValidation('new_password', types, msgs);
    const { verify_password } = this.appController.getErrorValidation('verify_password', typesAux, msgAux);

    this.errorMsgs = { new_password, verify_password };
  }

  matchValues(pControl: FormControl): ValidationErrors {
    if (this.resetForm) {
      const controls = this.resetForm.controls;
      if (pControl.value?.length >= 8 && pControl.value === controls.verify_password.value) {
        return { matchValues: true };
      }
    }

    return null;
  }


}
