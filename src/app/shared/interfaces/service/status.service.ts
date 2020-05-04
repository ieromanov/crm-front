import { Observable } from 'rxjs';
import { PagingResponseDto, PagingRequestDto } from '@shared/interfaces/dto/paging.dto';
import { IStatus } from '../entity/status.interface';

export interface IStatusService {
  getAll(params?: PagingRequestDto<IStatus>): Observable<PagingResponseDto<IStatus>>
  get(id: string): Observable<IStatus>
  create(dto: IStatus): Observable<IStatus>
  delete(id: string): Observable<any>
  update(id: string, dto: IStatus): Observable<IStatus>
}