import { Provider } from '@angular/core';
import { CONSTANT_SERVICE } from '@core/di-tokens';
import { ConstantService } from '@core/services/constant.service';

export const ConstantServiceProvider: Provider = {
  provide: CONSTANT_SERVICE,
  useClass: ConstantService
}