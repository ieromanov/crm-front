import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';

import { API_SERVICE } from '@core/di-tokens';
import { CrudService } from '@shared/crud/crud-abstract.service';
import { IHome } from '@shared/interfaces/entity/home.interface';
import { IHomeService } from '@shared/interfaces/service/home-service.interface';
import { IApiService } from '@shared/interfaces/service/api-service.interface';
import { PagingRequestDto, PagingResponseDto } from '@shared/interfaces/dto/paging.dto';

@Injectable()
export class HomeService extends CrudService<IHome> implements IHomeService {
  constructor(
    @Inject(API_SERVICE)
    private readonly apiService: IApiService
  ) {
    super('home', apiService);
  }

  findAllWithRooms(params?: PagingRequestDto<IHome>): Observable<PagingResponseDto<IHome>> {
    return this._apiService
      .get(this._controllerName + '/get-with-rooms', params)
  }

  updateWithRelations(id: string, dto: IHome): Observable<IHome> {
    return this._apiService
      .put(this._controllerName + `/${id}/update-with-relations`, dto)
  }
}
