import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";

export abstract class DefaultResolver implements Resolve<any> {

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.resolver(route.params);
  }

  abstract resolver(params);
}
