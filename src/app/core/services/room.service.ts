import { Injectable, Inject } from '@angular/core';

import { API_SERVICE } from '@core/di-tokens';
import { CrudService } from '@shared/crud/crud-abstract.service';
import { IRoom } from '@shared/interfaces/entity/room.interface';
import { IRoomService } from '@shared/interfaces/service/room-service.interface';
import { IApiService } from '@shared/interfaces/service/api-service.interface';

@Injectable({ providedIn: 'root' })
export class RoomService extends CrudService<IRoom> implements IRoomService {
  constructor(
    @Inject(API_SERVICE)
    private readonly apiService: IApiService
  ) {
    super('room', apiService);
  }
}
