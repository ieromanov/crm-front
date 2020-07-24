import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { PagingRequestDto, PagingResponseDto } from '@shared/dto/paging.dto';
import { CreateRequestDTO } from '@shared/dto/create-request.dto';
import { IRequest } from '@shared/interfaces/entity/request.interface';
import { ApiService } from './api.service';

@Injectable()
export class RequestService {
  private readonly _controllerName: string = 'request';

  constructor(private readonly _apiService: ApiService) {}

  create(dto: CreateRequestDTO) {
    return this._apiService.post<CreateRequestDTO, IRequest>(
      this._controllerName,
      dto
    );
  }

  findAll(
    dto?: PagingRequestDto<IRequest>
  ): Observable<PagingResponseDto<IRequest>> {
    return this._apiService.post<
      PagingRequestDto<IRequest>,
      PagingResponseDto<IRequest>
    >(this._controllerName + '/find-all', dto);
  }

  findById(id: string) {
    return this._apiService.get<IRequest>(this._controllerName + '/' + id);
  }
}
