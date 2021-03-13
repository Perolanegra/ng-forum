import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "src/app/core/auth.service";
import { Store, Select } from "@ngxs/store";
import { AuthActions } from "src/app/state/auth/auth.actions";
import { AppController } from "src/app/core/appController";
import { ToastComponent } from "../components/toast/toast.component";

@Injectable({
  providedIn: "root",
})
export class ResetPasswordGuard implements CanActivate {
  private hasntAlreadyReseted: boolean;
  private token: string;

  constructor(
    private store: Store,
    private authService: AuthService,
    private router: Router,
    private appController: AppController
  ) {
    this.store.select((state) => {
      this.hasntAlreadyReseted = state.auth.hasResetPass;
      this.token = state.auth.token;
    });
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    if (!this.token) {
      this.appController.navigate("login");
    }

    const url = window.location.href;
    const index = url.indexOf("bnag=");

    if (!this.hasntAlreadyReseted && index != -1) {
      const token = url.slice(index + 5);

      const tokenIsValid = this.authService.isAuthenticated(token);

      if (tokenIsValid) {
        // se o token for válido, eu guardo ele.
        this.store.dispatch(new AuthActions.SetNotAuth("tokenIsValid"));
        this.store.dispatch(new AuthActions.SetResetToken(token));
        return tokenIsValid;
      } else {
        const paylaod = {
          message: "Token expirado. Por favor, realize uma nova solitição.",
          title: "Acesso Expirado",
          type: "error",
          style: { posTop: "5vh" },
        };
        this.appController.showToastPopUp(paylaod, ToastComponent);
      }
    }

    this.appController.navigate(this.router.routerState.snapshot.url);

    return false;
  }
}
