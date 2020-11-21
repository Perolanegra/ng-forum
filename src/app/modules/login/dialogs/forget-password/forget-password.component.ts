import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { NgDialogDefault } from 'src/app/core/ng-dialog';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { AppController } from 'src/app/core/appController';
import { Store, Select } from '@ngxs/store';
import { AuthActions } from 'src/app/state/auth/auth.actions';
import { AuthState } from 'src/app/state/auth/auth.state';
import { Observable, Subscription } from 'rxjs';
import { ToastComponent } from '../../../../shared/components/toast/toast.component';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'ng-reset-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent extends NgDialogDefault implements OnInit, OnDestroy {

  @Select(AuthState.forgotPassResponse) fPassResponse$: Observable<any>;
  private fPassResponseSubscription$: Subscription;

  constructor(
    public formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<ForgetPasswordComponent>,
    protected dialog: MatDialog,
    protected appController: AppController,
    private store: Store,
    protected spinner: NgxSpinnerService,
    @Inject(MAT_DIALOG_DATA) public data) {
    super(dialogRef, formBuilder, appController, false);
  }

  ngOnInit(): void {
    this.setForm();
  }

  setForm() {
    this._form.addControl("username", new FormControl(null, Validators.required));
  }

  ngOnDestroy() {
    this.fPassResponseSubscription$ ? this.fPassResponseSubscription$.unsubscribe() : null;
  }

  getResponse() {
    this.fPassResponseSubscription$ = this.fPassResponse$.subscribe(async (data) => {
      if (data) {
        this.spinner.hide();
        this.appController.showToastPopUp(data, ToastComponent);
        this.close();
      }
    });
  }

  submit(): void {
    if (this._form.valid) {
      this.hasClickSubmit = this._form.valid;
      this.spinner.show();
      this.store.dispatch(new AuthActions.ForgotPassword(this._form.get('username').value));
      this._form.reset();
      this.getResponse();
      setTimeout(() => this.hasClickSubmit = !this.hasClickSubmit, 2000);
    }
  }

  public setErrorValidation() {
    throw new Error("Method not implemented.");
  }

  public setComponentState() {
    throw new Error("Method not implemented.");
  }

}
