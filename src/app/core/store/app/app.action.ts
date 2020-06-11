import { createAction, props } from '@ngrx/store';

export enum AppActionTypes {
  setLoading = '[App] set loading',
}

export const setLoadingAction = createAction(
  AppActionTypes.setLoading,
  props<{ loading: boolean }>()
);
