import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

import { IRequest } from '@shared/interfaces/entity/request.interface';
import { SocketResponse } from '@shared/types/socket-response.type';

@Injectable()
export class RequestSocketService extends Socket {
  public requestCreated$ = this.fromEvent<SocketResponse<IRequest>>('request-created');

  constructor() {
    super({ url: 'http://localhost:3000/request', options: {} });
  }
}
