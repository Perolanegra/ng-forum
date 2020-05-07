import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from 'src/app/core/auth.service';
import { Store } from '@ngxs/store';
import { AuthActions } from 'src/app/state/auth/auth.actions';

@Injectable({
    providedIn: 'root'
})
export class ResetPasswordGuard implements CanActivate {

    constructor(private store: Store, private authService: AuthService, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {

        const url = window.location.href;
        const token = url.slice(url.indexOf('bnag=') + 5, 99999);
            
        const tokenIsValid = this.authService.isAuthenticated(token);
        
        if (tokenIsValid) { // se o token for válido, eu guardo ele.
            this.store.dispatch(new AuthActions.SetResetToken(token));
            return true;
        }
        
        this.router.navigate(['/login']);
        // jogar um toast pro cara
        return false;
    }
}