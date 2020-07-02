import { Injectable, Inject } from '@angular/core';

import { API_SERVICE } from '@core/di-tokens';
import { CrudService } from '@shared/crud/crud-abstract.service';
import { IHomeType } from '@shared/interfaces/entity/home.interface';
import { IHomeTypeService } from '@shared/interfaces/service/home-service.interface';
import { IApiService } from '@shared/interfaces/service/api-service.interface';

@Injectable({ providedIn: 'root' })
export class HomeTypeService extends CrudService<IHomeType> implements IHomeTypeService {
  constructor(
    @Inject(API_SERVICE)
    private readonly apiService: IApiService
  ) {
    super('home', apiService);
  }
}
