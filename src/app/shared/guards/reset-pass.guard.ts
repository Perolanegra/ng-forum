import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from 'src/app/core/auth.service';
import { Store, Select } from '@ngxs/store';
import { AuthActions } from 'src/app/state/auth/auth.actions';
import { AppController } from 'src/app/core/appController';
import { ToastComponent } from '../components/toast/toast.component';

@Injectable({
    providedIn: 'root'
})
export class ResetPasswordGuard implements CanActivate {
    dataFilled: boolean;
    token;

    constructor(private store: Store, private authService: AuthService, private router: Router, private appController: AppController) { 
        this.store.select(state => {
            this.dataFilled = state.auth.hasResetPass;
            this.token = state.auth.token;
        });
    }

    canActivate(route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {

        const url = window.location.href;
        const index = url.indexOf('bnag=');
        
        if(!this.dataFilled) {
            if (index != -1) {
                const token = url.slice(index + 5, 99999);
    
                const tokenIsValid = this.authService.isAuthenticated(token);
    
                if (tokenIsValid) { // se o token for válido, eu guardo ele.
                    this.store.dispatch(new AuthActions.SetNotAuth('tokenIsValid'));
                    this.store.dispatch(new AuthActions.SetResetToken(token));
                    return tokenIsValid;
                }
                else {
                    const style = { positionTop: '5vh', positionBottom: null, positionLeft: null, positionRight: null };
                    const paylaod = { message: 'Token expirado. Por favor, realize uma nova solitição.', title: 'Acesso Expirado.', type: 'error', style }
                    this.appController.showToastPopUp(paylaod, ToastComponent);
                }
            }
        }

        if(!this.token) {
            this.router.navigate(['/login']);
        }
        this.router.navigate([this.router.routerState.snapshot.url]);
        return false;
    }
}