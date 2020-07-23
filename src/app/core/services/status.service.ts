import { Injectable } from '@angular/core';

import { IStatusService } from '@shared/interfaces/service/status-service.interface';
import { IStatus } from '@shared/interfaces/entity/status.interface';
import { CrudService } from '@shared/crud/crud-abstract.service';
import { ApiService } from './api.service';

@Injectable()
export class StatusService extends CrudService<IStatus>
  implements IStatusService {
  constructor(
    private readonly apiService: ApiService
  ) {
    super('status', apiService);
  }
}
