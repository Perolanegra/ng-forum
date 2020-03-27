import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { Observable } from "rxjs";
import { GlobalVars } from 'src/app/core/globalVars';


@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate{

    constructor(private globalVars: GlobalVars,
    private router: Router){}

    canActivate(route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {          
                 
        if(!this.globalVars.isLogged()) {
            this.router.navigate(['login']);
            return false;
        }
        
        return true;
    }

}