import { Injectable, Inject } from '@angular/core';

import { IStatus } from '@shared/interfaces/entity/status.interface';
import { IApiService } from '@shared/interfaces/service/api-service.interface';
import { API_SERVICE } from '@core/di-tokens';
import { CrudService } from '@shared/crud/crud-abstract.service';
import { IServiceTypeService } from '@shared/interfaces/service/service-type-service.interface';

@Injectable()
export class ServiceTypeService extends CrudService<IStatus> implements IServiceTypeService {
  constructor(
    @Inject(API_SERVICE)
    private readonly apiService: IApiService
  ) {
    super('service-type', apiService);
  }
}
