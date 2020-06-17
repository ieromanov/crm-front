import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatMap } from 'rxjs/operators';
import { of, concat, merge } from 'rxjs';

import {
  startLoadingAction,
  finishLoadingAction,
  loadInitialDataAction,
} from '@store/app/app.action';
import { getUserInfoAction } from '@store/user/user.action';
import { loadStatusesAction } from '@store/dictionaries/status-dictionary/status-dictionary.action';
import { loadHomeTypesAction } from '@store/dictionaries/home-type-dictionary/home-type-dictionary.action';

@Injectable()
export class AppEffects {
  constructor(private readonly _actions$: Actions) {}

  loadInitialData$ = createEffect(() =>
    this._actions$.pipe<any, any>(
      ofType(loadInitialDataAction),
      concatMap(() =>
        concat(
          of(getUserInfoAction()),
          of(loadStatusesAction()),
          of(loadHomeTypesAction()),
        )
      )
    )
  );
}
