import { Provider } from '@angular/core';
import { CONSTANT_SERVICE } from '@core/di-tokens';
import { ConstantService } from '@core/services/constant.setvice';

export const ConstantServiceProvider: Provider = {
  provide: CONSTANT_SERVICE,
  useClass: ConstantService
}