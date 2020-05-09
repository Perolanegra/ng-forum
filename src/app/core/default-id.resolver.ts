import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { DefaultResolver } from './default.resolver';


export abstract class DefaultIdResolver extends DefaultResolver {

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if(route.params.id) {
        return super.resolve(route, state);
    } else {
        return [];
    }
  }
}
