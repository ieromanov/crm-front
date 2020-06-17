import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concat } from 'rxjs'
import { map, concatMap } from 'rxjs/operators';

import {
  setManyHomeTypesAction,
  loadHomeTypesAction,
} from './home-type-dictionary.action';
import { HomeTypeService } from '@core/services/home-type.service';
import { of } from 'rxjs';
import { startLoadingAction, finishLoadingAction } from '@core/store/app/app.action';

@Injectable()
export class HomeTypeDictionaryEffects {
  constructor(
    private readonly _actions$: Actions,
    private readonly _homeTypeService: HomeTypeService
  ) {}

  loadHomeTypes$ = createEffect(() =>
    this._actions$.pipe<any, any>(
      ofType(loadHomeTypesAction),
      concatMap(() => concat(
          of(startLoadingAction()),
          this._homeTypeService.findAll().pipe(
            map(({ data }) => setManyHomeTypesAction({ homeTypes: data }))
          ),
          of(finishLoadingAction()),
        )
      )
    )
  );
}
