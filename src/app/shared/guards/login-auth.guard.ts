import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { Observable } from "rxjs";
import { Store } from '@ngxs/store';
import { AppController } from 'src/app/core/appController';
import { NgDefault } from 'src/app/core/pattern/ng-default';

@Injectable({
    providedIn: 'root'
})
export class LoginAuthGuard implements CanActivate {
    token;
    constructor(private store: Store, public appController: AppController) {
        this.store.subscribe(state => this.token = state.auth.token);
    }

    canActivate(route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
        
        if (this.token) {
            this.appController.navigate('issues');
            return false;
        }
        
        return true;
    }
}