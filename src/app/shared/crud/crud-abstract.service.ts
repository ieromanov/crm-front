import { Observable } from 'rxjs';

import { ApiService } from '@core/services/api.service';
import { PagingRequestDto, PagingResponseDto } from '@shared/dto/paging.dto';
import { ICrudService } from './crud-service.interface';

export abstract class CrudService<T> implements ICrudService<T> {
  constructor(
    protected readonly _controllerName: string,
    protected readonly _apiService: ApiService,
  ) {}

  create<T, P>(dto: T): Observable<P> {
    return this._apiService
      .post<T, P>(this._controllerName, dto)
  }

  update(id: string, t: T): Observable<T> {
    return this._apiService
      .put<T>(this._controllerName + "/" + id, t, {})
  }

  patch(id: string, t: Partial<T>): Observable<T> {
    return this._apiService
      .patch<T>(this._controllerName + "/" + id, t, {})
  }

  findById(id: string): Observable<T> {
    return this._apiService
      .get<T>(this._controllerName + "/" + id)
  }

  findAll(params?: PagingRequestDto<T>): Observable<PagingResponseDto<T>> {
    return this._apiService
      .get<PagingResponseDto<T>>(this._controllerName, { params })
  }

  delete(id: string): Observable<T> {
    return this._apiService
      .delete<T>(this._controllerName + '/' + id)
  }

}