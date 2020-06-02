import { Provider } from '@angular/core';
import { ROOM_SERVICE } from '@core/di-tokens';
import { RoomService } from '@core/services/room.service';

export const RoomServiceProvider: Provider = {
  provide: ROOM_SERVICE,
  useClass: RoomService
}