import { Observable } from 'rxjs';
import { ICrudService } from './crud-service.interface';
import { IApiService } from '@shared/interfaces/service/api-service.interface';
import { PagingRequestDto, PagingResponseDto } from '@shared/dto/paging.dto';

export abstract class CrudService<T> implements ICrudService<T> {
  constructor(
    protected readonly _controllerName: string,
    protected readonly _apiService: IApiService,
  ) {}

  create<T, P>(dto: T): Observable<P> {
    return this._apiService
      .post<T, P>(this._controllerName, dto)
  }

  update(id: string, t: T): Observable<T> {
    return this._apiService
      .put<T>(this._controllerName + "/" + id, t, {})
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