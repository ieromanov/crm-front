import { Injectable, Inject } from '@angular/core';
import { UserInfo } from '@shared/types/user-info.type';
import { API_SERVICE } from '@core/di-tokens';
import { IApiService } from '@shared/interfaces/service/api-service.interface';
import { Observable } from 'rxjs';
import { FindUserDTO } from '@shared/dto/find-user.dto';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(
    @Inject(API_SERVICE)
    private readonly _apiService: IApiService
  ) {}

  getUserInfo(): Observable<UserInfo> {
    return this._apiService.get('user/current-user-info')
  }

  find(dto: FindUserDTO) {
    return this._apiService.post<FindUserDTO, UserInfo>('user/find/', dto)
  }
}