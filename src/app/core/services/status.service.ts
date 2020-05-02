import { Injectable, Inject } from '@angular/core';
import { Observable, of } from 'rxjs';

import { IStatusService } from '@shared/interfaces/service/status.service';
import { IStatus } from '@shared/interfaces/entity/status.interface';
import { IApiService } from '@shared/interfaces/service/api-service.interface';
import { API_SERVICE } from '@core/di-tokens';
import { PagingRequestDto, PagingResponseDto } from '@shared/interfaces/dto/paging.dto';
import { catchError } from 'rxjs/operators';

@Injectable()
export class StatusService implements IStatusService {
  private readonly _controllerURL: string = '/request-status/'

  constructor(
    @Inject(API_SERVICE)
    private readonly apiService: IApiService
  ) {}

  getAll(params?: PagingRequestDto<IStatus>): Observable<PagingResponseDto<IStatus>> {
    return this.apiService
      .get(this._controllerURL, { params })
      .pipe(catchError((err) => of(err)));
  }

  get(id: string): Observable<IStatus> {
    return this.apiService
      .get(this._controllerURL + id)
      .pipe(catchError((err) => of(err)));
  }

  delete(id: string): Observable<any> {
    return this.apiService
      .delete(this._controllerURL + id)
  }

  create(): void {} // TODO
  update(): void {} // TODO
}
