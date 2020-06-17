import { createAction } from '@ngrx/store';

enum AppActionTypes {
  startLoading = '[App] loading start',
  finishLoading = '[App] loading finish',
  
  loadInitialData = '[App] load initial data'
}

export const startLoadingAction = createAction(AppActionTypes.startLoading);

export const finishLoadingAction = createAction(AppActionTypes.finishLoading);

export const loadInitialDataAction = createAction(AppActionTypes.loadInitialData);
