import { Provider } from '@angular/core';
import { HOME_SERVICE } from '@core/di-tokens';
import { HomeTypeService } from '@core/services/home-type.service';

export const HomeTypeServiceProvider: Provider = {
  provide: HOME_SERVICE,
  useClass: HomeTypeService
}