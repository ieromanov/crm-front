import { Provider } from '@angular/core';
import { SERVICE_TYPE_SERVICE } from '@core/di-tokens';
import { ServiceTypeService } from '@core/services/service-type.service';

export const ServiceTypeServiceProvider: Provider = {
  provide: SERVICE_TYPE_SERVICE,
  useClass: ServiceTypeService
}