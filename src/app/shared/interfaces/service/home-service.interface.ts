import { IHomeType } from '../entity/home.interface';
import { ICrudService } from '@shared/crud/crud-service.interface';
import { PagingRequestDto, PagingResponseDto } from '@shared/dto/paging.dto';
import { Observable } from 'rxjs';

export interface IHomeTypeService extends ICrudService<IHomeType> {
  findAllWithRooms(params?: PagingRequestDto<IHomeType>): Observable<PagingResponseDto<IHomeType>>;
  updateWithRelations(id: string, dto: IHomeType): Observable<IHomeType>
}