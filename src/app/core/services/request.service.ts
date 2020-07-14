import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';

import { API_SERVICE } from '@core/di-tokens';
import { IApiService } from '@shared/interfaces/service/api-service.interface';
import { PagingRequestDto, PagingResponseDto } from '@shared/dto/paging.dto';
import { CreateRequestDTO } from '@shared/dto/create-request.dto';
import { IRequest } from '@shared/interfaces/entity/request.inerface';

@Injectable()
export class RequestService {
  private readonly _controllerName: string = 'request'

  constructor(
    @Inject(API_SERVICE)
    private readonly _apiService: IApiService
  ) {}

  create(dto: CreateRequestDTO) {
    return this._apiService.post<CreateRequestDTO, IRequest>(this._controllerName + '/create', dto)
  }

  findAll(params?: PagingRequestDto<IRequest>): Observable<PagingResponseDto<IRequest>> {
    return this._apiService.get<PagingResponseDto<IRequest>>(this._controllerName + '/find-all', { params })
  }
}