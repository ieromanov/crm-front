import { Injectable, Inject } from '@angular/core';

import { API_SERVICE } from '@core/di-tokens';
import { CrudService } from '@shared/crud/crud-abstract.service';
import { IHome } from '@shared/interfaces/entity/home.interface';
import { IHomeService } from '@shared/interfaces/service/home-service.interface';
import { IApiService } from '@shared/interfaces/service/api-service.interface';

@Injectable()
export class HomeService extends CrudService<IHome> implements IHomeService {
  constructor(
    @Inject(API_SERVICE)
    private readonly apiService: IApiService
  ) {
    super('home', apiService);
  }
}
