import { Injectable, Inject } from '@angular/core';
import { UserInfo } from '@shared/types/user-info.type';
import { API_SERVICE } from '@core/di-tokens';
import { CrudService } from '@shared/crud/crud-abstract.service';
import { IApiService } from '@shared/interfaces/service/api-service.interface';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService extends CrudService<UserInfo> {
  constructor(
    @Inject(API_SERVICE)
    private readonly apiService: IApiService
  ) {
    super('user', apiService)
  }

  getUserInfo(): Observable<UserInfo> {
    return this._apiService
      .get(this._controllerName + '/current-user-info')
  }
}