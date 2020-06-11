import { Observable } from 'rxjs';
import { PagingResponseDto, PagingRequestDto } from '@shared/dto/paging.dto';

export interface ICrudService<T> {
  findAll(params?: PagingRequestDto<T>): Observable<PagingResponseDto<T>>;
  findById(id: string): Observable<T>;
  create(dto: T): Observable<T>;
  update(id: string, dto: T): Observable<T>;
  delete(id: string): Observable<any>;
}
