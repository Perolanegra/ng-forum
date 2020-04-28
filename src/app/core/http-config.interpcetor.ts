import { Injectable } from '@angular/core';import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpHeaders } from '@angular/common/http';import { Store } from '@ngxs/store';import { Observable, throwError } from 'rxjs';import { AppState } from '../shared/state/app.state';
import { map, catchError } from 'rxjs/operators';
import { AppController } from './appController';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {

  constructor(private _store: Store, private appController: AppController) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    const token = this._store.selectSnapshot<string>((state: { token: string }) => state.token);

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
          this.appController.tratarErro(error.error.message);
          return throwError(error);
        }));
  }

}