import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { NzNotificationModule } from 'ng-zorro-antd/notification';

import { AuthInterceptor } from './interceptors/auth.interceptor';
import { ApiServiceProvider } from './provider/api-service.provider';
import { AuthService } from './services/auth.service';

@NgModule({
  imports: [CommonModule, HttpClientModule, NzNotificationModule],
  providers: [
    ApiServiceProvider,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
})
export class CoreModule {}
