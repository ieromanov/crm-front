import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap } from 'rxjs/operators';
import { of, merge } from 'rxjs';

import { finishFirstLoadingAction } from '@store/app/app.action';
import { getUserInfoSuccessAction } from '@store/user/user.action';
import { loadAction as loadStatusesAction } from '@store/dictionaries/status-dictionary/status-dictionary.action';
import { loadAction as loadHomeTypesAction } from '@store/dictionaries/home-type-dictionary/home-type-dictionary.action';
import { loadAction as loadServiceTypesAction } from '@store/dictionaries/service-type-dictionary/service-type-dictionary.action';
import { loadAction as loadRoomAction } from '@store/dictionaries/room-dictionary/room-dictionary.action';

@Injectable()
export class AppEffects {
  constructor(private readonly _actions$: Actions) {}

  loadInitialData$ = createEffect(() =>
    this._actions$.pipe<any, any>(
      ofType(getUserInfoSuccessAction),
      mergeMap(() =>
        merge(
          of(loadStatusesAction()),
          of(loadHomeTypesAction()),
          of(loadServiceTypesAction()),
          of(loadRoomAction()),
          of(finishFirstLoadingAction())
        )
      )
    )
  );
}
