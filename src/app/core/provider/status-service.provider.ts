import { Provider } from '@angular/core';
import { STATUS_SERVICE } from '@core/di-tokens';
import { StatusService } from '@core/services/status.service';

export const StatusServiceProvider: Provider = {
  provide: STATUS_SERVICE,
  useClass: StatusService
}