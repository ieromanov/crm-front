import { Injectable, Inject } from '@angular/core';

import { IStatus } from '@shared/interfaces/entity/status.interface';
import { CrudService } from '@shared/crud/crud-abstract.service';
import { IServiceTypeService } from '@shared/interfaces/service/service-type-service.interface';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class ServiceTypeService extends CrudService<IStatus> implements IServiceTypeService {
  constructor(
    private readonly apiService: ApiService
  ) {
    super('service-type', apiService);
  }
}
