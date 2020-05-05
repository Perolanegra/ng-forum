import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute, Router } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from 'src/app/core/auth.service';

@Injectable({
    providedIn: 'root'
})
export class ResetPasswordGuard implements CanActivate {

    constructor(private route: ActivatedRoute, private authService: AuthService, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {

        const url = window.location.href;
        const token = url.slice(url.indexOf('bnag=') + 5, 999);
            
        const tokenIsValid = this.authService.isAuthenticated(token);
        
        if (!tokenIsValid) {
            this.router.navigate(['/login']);
            return false;
        }

        return true;
    }
}