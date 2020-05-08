import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { Observable } from "rxjs";
import { Store } from '@ngxs/store';

@Injectable({
    providedIn: 'root'
})
export class LoginAuthGuard implements CanActivate {
    token;

    constructor(private store: Store, private router: Router) {
        this.store.select(state => this.token = state.auth.token);

    }

    canActivate(route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {

        if (this.token) {
            this.router.navigate(['/home']);
            return false;
        }
        
        return true;
    }
}