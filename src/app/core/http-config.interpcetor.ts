import { Injectable } from '@angular/core'; 
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http'; 
import { Store, Select } from '@ngxs/store'; 
import { Observable, throwError } from 'rxjs'; 
import { map, catchError } from 'rxjs/operators';
import { AppController } from './appController';
import { AuthState } from '../state/auth/auth.state';
import { AuthActions } from '../state/auth/auth.actions';
import { ToastComponent } from '../shared/components/toast/toast.component';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {

  @Select(AuthState.token) token$: Observable<string>;

  constructor(private _store: Store, private appController: AppController) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token = !!this._store.selectSnapshot(state => state.auth.token);

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Headers': '*',
      'Access-Control-Allow-Origin': '*',
      'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InBlcm9sYW5lZ3JhIiwicGFzc3dvcmQiOiIkMmEkMTAkdUhsblRMMU9yR0FuMjE5N0tydjNMLlhXb0NLTDJjMUR6a2ZLT1lMVGNobWxjalB6QXhGa20iLCJpYXQiOjE1ODg2OTI5NTUsImV4cCI6MTU4ODY5Mjk2NX0.uedUlqjmx7Lg0eGbi6g5cZwrihvTPxRPVLXPKK5kEfY`
    });

    req = req.clone({ headers: headers });

    return next.handle(req).pipe(
      map((event: HttpEvent<any>) => {
        // loader aqui
        return event;
      }),
      catchError((error) => {
        // setar interceptors específicos caso haja request para api externa.
        const { message, title, type, style } = error.error;

        if (error.status === 401 && !type) {
          console.log('ok putassss'); // testar quando for uma request de sessao expirada p ver se da certo.
          this._store.dispatch(new AuthActions.RemoveAccess());
        }

        this.appController.hideSpinner();
        this.appController.showToastPopUp({ title, message, type, style }, ToastComponent);

        return throwError(error);
      }));
  }

}