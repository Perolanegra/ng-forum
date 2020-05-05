import { Injectable } from '@angular/core';import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpHeaders } from '@angular/common/http';import { Store, Select } from '@ngxs/store';import { Observable, throwError } from 'rxjs';import { AppState } from '../shared/state/app.state';
import { map, catchError } from 'rxjs/operators';
import { AppController } from './appController';
import { AuthState } from '../state/auth/auth.state';
import { AuthActions } from '../state/auth/auth.actions';
import { ToastComponent } from '../shared/components/toast/toast.component';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {

  @Select(AuthState.token) token$: Observable<string>;

  constructor(private _store: Store, private appController: AppController) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    const token = !!this._store.selectSnapshot(state => state.auth.token);
    
    if (token) {
      req = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + token) });
    }

    if (!req.headers.has('Content-Type')) {
        req = req.clone({ headers: req.headers.set('Content-Type', 'application/json') });
    }

    return next.handle(req).pipe(
        map((event: HttpEvent<any>) => {
            // loader aqui
            return event;
        }),
        catchError((error) => {          
           // setar interceptors específicos caso haja request para api externa.
          const { message, title, type, style } = error.error;
         
          if(error.status === 401 && !type) {
            console.log('ok putassss'); // testar quando for uma request de sessao expirada p ver se da certo.
            this._store.dispatch(new AuthActions.RemoveAccess());
          }
          
          this.appController.showToastPopUp({ title, message, type, style }, ToastComponent);
         
          return throwError(error);
        }));
  }

}