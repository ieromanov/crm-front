import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concat } from 'rxjs'
import { map, concatMap } from 'rxjs/operators';

import {
  setManyStatusesAction,
  loadStatusesAction,
} from './status-dictionary.action';
import { StatusService } from '@core/services/status.service';
import { of } from 'rxjs';
import { startLoadingAction, finishLoadingAction } from '@core/store/app/app.action';

@Injectable()
export class StatusDictionaryEffects {
  constructor(
    private readonly _actions$: Actions,
    private readonly _statusService: StatusService
  ) {}

  loadStatuses$ = createEffect(() =>
    this._actions$.pipe<any, any>(
      ofType(loadStatusesAction),
      concatMap(() => concat(
          of(startLoadingAction()),
          this._statusService.findAll().pipe(
            map(({ data }) => setManyStatusesAction({ statuses: data }))
          ),
          of(finishLoadingAction()),
        )
      )
    )
  );
}
