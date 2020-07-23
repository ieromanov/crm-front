import { Injectable } from '@angular/core';

import { CrudService } from '@shared/crud/crud-abstract.service';
import { IHomeType } from '@shared/interfaces/entity/home.interface';
import { IHomeTypeService } from '@shared/interfaces/service/home-service.interface';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class HomeTypeService extends CrudService<IHomeType> implements IHomeTypeService {
  constructor(
    private readonly apiService: ApiService
  ) {
    super('home', apiService);
  }
}
