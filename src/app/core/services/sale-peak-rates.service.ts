import { Injectable } from '@angular/core';

import { ISalePeakRate } from '@shared/interfaces/entity/sale-rates.interface';
import { CrudService } from '@shared/crud/crud-abstract.service';
import { ApiService } from './api.service';

@Injectable()
export class SalePeakRatesService extends CrudService<ISalePeakRate> {
  constructor(private readonly apiService: ApiService) {
    super('sale-peak', apiService);
  }
}
