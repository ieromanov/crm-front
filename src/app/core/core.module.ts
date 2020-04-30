import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AuthInterceptor } from './interceptors/auth.interceptor';
import { ApiService } from './services/api.service';
import { API_SERVICE } from '@core/di-tokens';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  providers: [
    {
      provide: API_SERVICE,
      useClass: ApiService,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
})
export class CoreModule {}
