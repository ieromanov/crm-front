import { Injectable, Inject } from '@angular/core';

import { IStatusService } from '@shared/interfaces/service/status-service.interface';
import { IStatus } from '@shared/interfaces/entity/status.interface';
import { IApiService } from '@shared/interfaces/service/api-service.interface';
import { API_SERVICE } from '@core/di-tokens';
import { CrudService } from '@shared/crud/crud-abstract.service';

@Injectable()
export class StatusService extends CrudService<IStatus>
  implements IStatusService {
  constructor(
    @Inject(API_SERVICE)
    private readonly apiService: IApiService
  ) {
    super('status', apiService);
  }
}
