import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';

import { API_SERVICE } from '@core/di-tokens';
import { UserInfo } from '@shared/types/user-info.type';
import { IApiService } from '@shared/interfaces/service/api-service.interface';
import { FindUserDTO } from '@shared/dto/find-user.dto';
import { CreateUserDTO } from '@shared/dto/create-user.dto';
import { UpdatePasswordDTO } from '@shared/dto/update-password.dto';
import { PagingRequestDto, PagingResponseDto } from '@shared/dto/paging.dto';

@Injectable()
export class UserService {
  private readonly _controllerName: string = 'user'

  constructor(
    @Inject(API_SERVICE)
    private readonly _apiService: IApiService
  ) {}

  create(dto: CreateUserDTO) {
    return this._apiService.post<CreateUserDTO, UserInfo>(this._controllerName + '/register', dto)
  }

  getUserInfo(): Observable<UserInfo> {
    return this._apiService.get(this._controllerName + '/current-user-info')
  }

  delete(id: string) {
    return this._apiService.delete(this._controllerName + '/delete/' + id)
  }

  find(dto: FindUserDTO): Observable<UserInfo> {
    return this._apiService.post<FindUserDTO, UserInfo>(this._controllerName + '/find', dto)
  }

  findAll(params?: PagingRequestDto<UserInfo>): Observable<PagingResponseDto<UserInfo>> {
    return this._apiService.get<PagingResponseDto<UserInfo>>(this._controllerName + '/find-all', { params })
  }

  updatePassword(dto: UpdatePasswordDTO) {
    return this._apiService.post<UpdatePasswordDTO, boolean>(this._controllerName + '/update-password', dto)
  }
}