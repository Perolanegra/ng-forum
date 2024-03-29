import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpHeaders,
} from "@angular/common/http";
import { Observable, throwError, EMPTY } from "rxjs";
import { map, catchError, finalize } from "rxjs/operators";
import { AppController } from "./appController";
import { AuthState } from "../state/auth/auth.state";
import { ToastComponent } from "../shared/components/toast/toast.component";

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
  constructor(
    private appController: AppController,
    private authState: AuthState
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    req = req.clone();
    
    if (this.authState.snapshot.token) {
      let headers = new HttpHeaders({
        "Content-Type": "application/json",
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${this.authState.snapshot.token}`,
      });
      req = req.clone({ headers: headers });
    }

    return next.handle(req).pipe(
      map((event: HttpEvent<any>) => event),
      catchError((err) => {
        const error = this.appController.handleError(err);
        this.appController.showToastPopUp(error, ToastComponent);
        return EMPTY;
      }),
    );
  }
}
