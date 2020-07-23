import { Injectable } from '@angular/core';

import { CrudService } from '@shared/crud/crud-abstract.service';
import { ISetting } from '@shared/interfaces/setting.interface';
import { ApiService } from './api.service';

@Injectable()
export class SettingService extends CrudService<ISetting> {
  constructor(
    private readonly apiService: ApiService
  ) {
    super('setting', apiService);
  }
}
