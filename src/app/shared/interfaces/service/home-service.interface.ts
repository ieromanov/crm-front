import { IHome } from '../entity/home.interface';
import { ICrudService } from '@shared/crud/crud-service.interface';
import { PagingRequestDto, PagingResponseDto } from '@shared/dto/paging.dto';
import { Observable } from 'rxjs';

export interface IHomeService extends ICrudService<IHome> {
  findAllWithRooms(params?: PagingRequestDto<IHome>): Observable<PagingResponseDto<IHome>>;
  updateWithRelations(id: string, dto: IHome): Observable<IHome>
}