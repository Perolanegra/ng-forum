import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { Observable } from "rxjs";
import { GlobalVars } from 'src/app/core/globalVars';
import { Select, Store } from '@ngxs/store';
import { AuthState } from 'src/app/state/auth/auth.state';


@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate{

    @Select(AuthState.token) token$: Observable<any>;

    constructor(private globalVars: GlobalVars,
    private store: Store,
    private router: Router) {
        
    }

    canActivate(route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {          

        
        return true;
    }

}