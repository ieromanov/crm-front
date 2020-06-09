import { Injectable, Inject } from '@angular/core';

import { ITruckService } from '@shared/interfaces/service/truck-service.interface';
import { ITruck } from '@shared/interfaces/entity/truck.interface';
import { IApiService } from '@shared/interfaces/service/api-service.interface';
import { API_SERVICE } from '@core/di-tokens';
import { CrudService } from '@shared/crud/crud-abstract.service';

@Injectable()
export class TruckService extends CrudService<ITruck>
  implements ITruckService {
  constructor(
    @Inject(API_SERVICE)
    private readonly apiService: IApiService
  ) {
    super('truck', apiService);
  }
}
