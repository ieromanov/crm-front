import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concat } from 'rxjs'
import { map, concatMap, catchError } from 'rxjs/operators';

import {
  addManyAction,
  loadAction,
  loadFailAction,
} from './room-dictionary.action';
import { RoomService } from '@core/services/room.service';
import { of } from 'rxjs';
import { startLoadingAction, finishLoadingAction } from '@core/store/app/app.action';

@Injectable()
export class RoomDictionaryEffects {
  constructor(
    private readonly _actions$: Actions,
    private readonly _service: RoomService
  ) {}

  load$ = createEffect(() =>
    this._actions$.pipe<any, any>(
      ofType(loadAction),
      concatMap(() => concat(
          of(startLoadingAction()),
          this._service.findAll().pipe(
            map(({ data }) => addManyAction({ entities: data })),
            catchError(() => of(loadFailAction()))
          ),
          of(finishLoadingAction()),
        )
      ),
    )
  );

  fail$ = createEffect(() => 
    this._actions$.pipe<any, any>(
      ofType(loadFailAction),
      map(() => finishLoadingAction())
    )
  )
}
