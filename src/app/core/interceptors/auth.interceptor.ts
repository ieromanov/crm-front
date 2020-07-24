import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { State } from '@core/store';
import { logoutAction } from '@core/store/user/user.action';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private readonly _router: Router
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<HttpErrorResponse>> {
    request = request.clone({ withCredentials: true });
    return next
      .handle(request)
      .pipe(catchError(this.handleAuthError.bind(this)));
  }

  private handleAuthError(err: HttpErrorResponse): Observable<HttpErrorResponse> {
    if (err.status === 401) {
      this._router.navigate(['/auth/login']);
    } else if (err.status === 403) {
      this._router.navigate(['/no-access']);
    }
    return throwError(err);
  }
}
