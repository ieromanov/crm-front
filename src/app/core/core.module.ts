import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AuthInterceptor } from './interceptors/auth.interceptor';
import { ApiServiceProvider } from './provider/api-service.provider';
import { AuthService } from './services/auth.service';

@NgModule({
  imports: [CommonModule, HttpClientModule],
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
