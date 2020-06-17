import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';

import { API_SERVICE } from '@core/di-tokens';
import { CrudService } from '@shared/crud/crud-abstract.service';
import { IHomeType } from '@shared/interfaces/entity/home.interface';
import { IHomeTypeService } from '@shared/interfaces/service/home-service.interface';
import { IApiService } from '@shared/interfaces/service/api-service.interface';
import { PagingRequestDto, PagingResponseDto } from '@shared/dto/paging.dto';

@Injectable({ providedIn: 'root' })
export class HomeTypeService extends CrudService<IHomeType> implements IHomeTypeService {
  constructor(
    @Inject(API_SERVICE)
    private readonly apiService: IApiService
  ) {
    super('home', apiService);
  }

  findAllWithRooms(params?: PagingRequestDto<IHomeType>): Observable<PagingResponseDto<IHomeType>> {
    return this._apiService
      .get(this._controllerName + '/get-with-rooms', params)
  }

  updateWithRelations(id: string, dto: IHomeType): Observable<IHomeType> {
    return this._apiService
      .put(this._controllerName + `/${id}/update-with-relations`, dto)
  }
}
