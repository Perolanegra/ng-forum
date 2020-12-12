import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AppController } from './appController';
import { AuthState } from '../state/auth/auth.state';
import { ToastComponent } from '../shared/components/toast/toast.component';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {

  constructor(private appController: AppController, private authState: AuthState) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    req = req.clone();

    if (this.authState.snapshot.token) {
      let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Origin': '*',
        'Authorization': `Bearer ${this.authState.snapshot.token}`
      });
      req = req.clone({ headers: headers });
    }

    return next.handle(req).pipe(
      map((event: HttpEvent<any>) => {
        // loader aqui
        return event;
      }),
      catchError((error) => {
        // setar interceptors específicos caso haja request para api externa.
        // const { message, title, type, style } = error.error;

        // if (error.status === 401 && !type) {
        //   console.log('ok putassss'); // testar quando for uma request de sessao expirada p ver se da certo.
        //   this._store.dispatch(new AuthActions.RemoveAccess());
        // }

        // this.appController.hideSpinner();
        // this.appController.showToastPopUp({ title, message, type, style }, ToastComponent);

        return throwError(error);
      }));
  }

}