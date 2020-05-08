import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { CustomValidators } from 'src/app/shared/validators/custom-validators';
import { AppController } from 'src/app/core/appController';
import { Select, Store } from '@ngxs/store';
import { AppState } from 'src/app/shared/state/app.state';
import { Observable, Subscription } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthState } from 'src/app/state/auth/auth.state';

@Component({
    selector: 'ng-sign-up',
    template: './sign-up.component.html',
    styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit, OnDestroy {

    @Select(AuthState.rPassResponse) rPassResponse$: Observable<any>;
    private rPassResponseSubscription$: Subscription;
    
    @Select(AppState.hasMobileMatches) stateMobileMatches$: Observable<any>;
    private stateMobileMatchesSubscription$: Subscription;

    public hide1 = true;
    public hide2 = true;
    public hasClickedSubmit: boolean = false;
    public errorMsgs: any;
    public signupForm: FormGroup;
    hasMobileMatches: boolean;

    constructor(private formBuilder: FormBuilder,
        private spinner: NgxSpinnerService,
        private store: Store,
        private appController: AppController) {

    }

    ngOnInit() {
        this.signupForm = this.formBuilder.group({
            passwrod: new FormControl(null, [Validators.required, CustomValidators.whitespace]),
            verify_password: new FormControl(null, Validators.compose([Validators.required, CustomValidators.whitespace, this.matchValues.bind(this)])),
        });

        this.stateMobileMatchesSubscription$ = this.stateMobileMatches$.subscribe(state => this.hasMobileMatches = state);

    }

    ngOnDestroy() {
        if (this.rPassResponseSubscription$ && this.stateMobileMatchesSubscription$) {
          this.rPassResponseSubscription$.unsubscribe();
          this.stateMobileMatchesSubscription$.unsubscribe();
        //   this.tokenSubscription$.unsubscribe();
          this.store.dispatch(new AuthActions.SetResetedPassword(true));
        }
      }

    setErrorValidation(): void {
        let types = ['required', 'minlength', 'whitespace'];
        let msgs = ['O campo é obrigatório.', 'Mínimo de 8 caracteres.', 'Não pode conter espaços em branco.']

        let msgAux = [], typesAux = [];
        msgAux.push(...msgs); msgAux.push('Senhas não coincidem.');
        typesAux.push(...types); typesAux.push('matchValues');

        const { new_password } = this.appController.setErrorValidation('new_password', types, msgs);
        const { verify_password } = this.appController.setErrorValidation('verify_password', typesAux, msgAux);

        this.errorMsgs = { new_password, verify_password };
    }

    public getStyle(trueValue, falseValue) {
        return this.hasMobileMatches ? trueValue : falseValue;
    }

    getResponse() {
        this.rPassResponseSubscription$ = this.rPassResponse$.subscribe(async (data) => {
          if (data) {
            this.store.dispatch(new AuthActions.RemoveToken());
            this.store.dispatch(new AuthActions.RemoveNotAuth());
            this.spinner.hide();
            this.appController.showToastPopUp(data, ToastComponent);
            setTimeout(() => this.appController.navigate('login'), 800);
          }
        });
      }
    
    //   async submit(): Promise<void> {
    //     if (this.resetForm.valid) {
    //       this.hasClickSubmit = this.resetForm.valid;
    //       this.spinner.show();
    
    //       this.tokenSubscription$ = this.token$.subscribe(access_token => {
    //         const passForm = this.resetForm.controls.verify_password.value;
    //         if (access_token && passForm) {
    //           const password = this.encryptService.set('10610433IA$#@$^@1ERF', this.resetForm.get('verify_password').value);
    //           this.store.dispatch(new AuthActions.ResetPass({ access_token, password }));
    //           this.resetForm.reset();
    //           this.ngZone.runOutsideAngular(() => {
    //             setTimeout(() => this.hasClickSubmit = !this.hasClickSubmit, 2000);
    //           });
    //         }
    //       });
    //     }
    //   }
}