import { Injectable } from '@angular/core';import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpHeaders } from '@angular/common/http';import { Store, Select } from '@ngxs/store';import { Observable, throwError } from 'rxjs';import { AppState } from '../shared/state/app.state';
import { map, catchError } from 'rxjs/operators';
import { AppController } from './appController';
import { AuthState } from '../state/auth/auth.state';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {

  @Select(AuthState.token) token$: Observable<string>;

  constructor(private _store: Store, private appController: AppController) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    let token;
    this._store.select(state => token = state.token);
    
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
          const { message, title, type } = error.error;
          const ref = this.appController.showToastPopUp({ title, message, type });
          ref.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
          });
          return throwError(error);
        }));
  }

}