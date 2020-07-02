import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';

import { API_SERVICE } from '@core/di-tokens';
import { UserInfo } from '@shared/types/user-info.type';
import { IApiService } from '@shared/interfaces/service/api-service.interface';
import { FindUserDTO } from '@shared/dto/find-user.dto';
import { PagingRequestDto, PagingResponseDto } from '@shared/dto/paging.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject(API_SERVICE)
    private readonly _apiService: IApiService
  ) {}

  getUserInfo(): Observable<UserInfo> {
    return this._apiService.get('user/current-user-info')
  }

  find(dto: FindUserDTO): Observable<UserInfo> {
    return this._apiService.post<FindUserDTO, UserInfo>('user/find', dto)
  }

  findAll(params?: PagingRequestDto<UserInfo>): Observable<PagingResponseDto<UserInfo>> {
    return this._apiService.get<PagingResponseDto<UserInfo>>('user/find-all', { params })
  }
}