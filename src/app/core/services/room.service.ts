import { Injectable } from '@angular/core';

import { CrudService } from '@shared/crud/crud-abstract.service';
import { IRoom } from '@shared/interfaces/entity/room.interface';
import { IRoomService } from '@shared/interfaces/service/room-service.interface';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class RoomService extends CrudService<IRoom> implements IRoomService {
  constructor(
    private readonly apiService: ApiService
  ) {
    super('room', apiService);
  }
}
