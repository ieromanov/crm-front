import { Provider } from '@angular/core';
import { HOME_SERVICE } from '@core/di-tokens';
import { HomeService } from '@core/services/home.service';

export const HomeServiceProvider: Provider = {
  provide: HOME_SERVICE,
  useClass: HomeService
}