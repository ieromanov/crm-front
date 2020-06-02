import { Observable, of } from 'rxjs';
import { ICrudService } from './crud-service.interface';
import { IApiService } from '@shared/interfaces/service/api-service.interface';
import { PagingRequestDto, PagingResponseDto } from '@shared/interfaces/dto/paging.dto';
import { catchError } from 'rxjs/operators';

export abstract class CrudService<T> implements ICrudService<T> {
  constructor(
    protected readonly _controllerName: string,
    protected readonly _apiService: IApiService,
  ) {}

  create(dto: T): Observable<T> {
    return this._apiService
      .post<T>(this._controllerName, dto)
      .pipe(catchError((err) => of(err)));
  }

  update(id: string, t: T): Observable<T> {
    return this._apiService
      .put<T>(this._controllerName + "/" + id, t, {})
      .pipe(catchError((err) => of(err)));
  }

  findById(id: string): Observable<T> {
    return this._apiService
      .get<T>(this._controllerName + "/" + id)
      .pipe(catchError((err) => of(err)));
  }

  findAll(params?: PagingRequestDto<T>): Observable<PagingResponseDto<T>> {
    return this._apiService
      .get<T[]>(this._controllerName, { params })
      .pipe(catchError((err) => of(err)));
  }

  delete(id: string): Observable<T> {
    return this._apiService
      .delete<T>(this._controllerName + '/' + id)
      .pipe(catchError((err) => of(err)));
  }

}