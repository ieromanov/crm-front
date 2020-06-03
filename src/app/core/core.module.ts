import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { NzNotificationModule } from 'ng-zorro-antd/notification';

import { AuthInterceptor } from './interceptors/auth.interceptor';
import { ApiServiceProvider } from './provider/api-service.provider';
import { HttpRequestInterceptor } from './interceptors/http-request.interceptor';
import { HttpErrorInterceptor } from './interceptors/http-error.interceptor';

@NgModule({
  imports: [CommonModule, HttpClientModule, NzNotificationModule],
  providers: [
    ApiServiceProvider,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpRequestInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    }
  ],
})
export class CoreModule {}
