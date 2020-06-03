import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private readonly notificationService: NzNotificationService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(catchError(this.handleError.bind(this)));
  }

  handleError(error: HttpErrorResponse) {
    let errorTitle = 'Error';
    let errorMessage = 'Error message';
    if (error.error instanceof ErrorEvent) {
      errorTitle = error.error.error;
      errorMessage = error.error.message;
    } else {
      errorTitle = 'Error code: ' + error.status;
      errorMessage = error.message;
    }
    this.notificationService.create('error', errorTitle, errorMessage, {
      nzDuration: 0,
      nzPlacement: 'bottomRight',
    });
    return throwError(error);
  }
}
