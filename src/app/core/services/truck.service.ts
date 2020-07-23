import { Injectable } from '@angular/core';

import { ITruckService } from '@shared/interfaces/service/truck-service.interface';
import { ITruck } from '@shared/interfaces/entity/truck.interface';
import { CrudService } from '@shared/crud/crud-abstract.service';
import { ApiService } from './api.service';

@Injectable()
export class TruckService extends CrudService<ITruck>
  implements ITruckService {
  constructor(
    private readonly apiService: ApiService
  ) {
    super('truck', apiService);
  }
}
