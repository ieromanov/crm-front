import { createAction } from '@ngrx/store';

enum AppActionTypes {
  startLoading = '[App] loading start',
  finishLoading = '[App] loading finish',

  finishFirstLoading = '[App] finish first loading',
}

export const startLoadingAction = createAction(AppActionTypes.startLoading);

export const finishLoadingAction = createAction(AppActionTypes.finishLoading);

export const finishFirstLoadingAction = createAction(AppActionTypes.finishFirstLoading);
