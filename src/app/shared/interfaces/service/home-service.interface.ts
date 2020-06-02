import { IHome } from '../entity/home.interface';
import { ICrudService } from '@shared/crud/crud-service.interface';

export interface IHomeService extends ICrudService<IHome> {}