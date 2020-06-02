import { IRoom } from '../entity/room.interface';
import { ICrudService } from '@shared/crud/crud-service.interface';

export interface IRoomService extends ICrudService<IRoom> {}