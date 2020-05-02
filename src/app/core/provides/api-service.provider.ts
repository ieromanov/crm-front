import { Provider } from '@angular/core';
import { API_SERVICE } from '@core/di-tokens';
import { ApiService } from '@core/services/api.service';

export const ApiServiceProvider: Provider = {
  provide: API_SERVICE,
  useClass: ApiService
}