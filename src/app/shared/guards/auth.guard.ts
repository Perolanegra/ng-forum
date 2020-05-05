import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { Observable } from "rxjs";
import { Store } from '@ngxs/store';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private store: Store, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {

        const token = !!this.store.selectSnapshot(state => state.auth.token);

        if (token) {
            this.router.navigate(['/home']);
            return false;
        }
        // this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return true;
    }
}