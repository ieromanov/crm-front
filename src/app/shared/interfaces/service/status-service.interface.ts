import { IStatus } from '../entity/status.interface';
import { ICrudService } from '@shared/crud/crud-service.interface';

export interface IStatusService extends ICrudService<IStatus> {}