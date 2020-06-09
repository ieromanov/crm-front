import { Provider } from '@angular/core';
import { TRUCK_SERVICE } from '@core/di-tokens';
import { TruckService } from '@core/services/truck.service';

export const TruckServiceProvider: Provider = {
  provide: TRUCK_SERVICE,
  useClass: TruckService
}