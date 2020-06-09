import { ITruck } from '../entity/truck.interface';
import { ICrudService } from '@shared/crud/crud-service.interface';

export interface ITruckService extends ICrudService<ITruck> {}