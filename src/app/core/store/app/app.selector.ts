import { createSelector, createFeatureSelector } from '@ngrx/store'
import { State } from '@store/index'
import { AppState } from '@store/app/app.reducer'

export const selectAppState =  createFeatureSelector<State, AppState>('app');

export const loadingAppSelector = createSelector(
  selectAppState,
  (state: AppState) => state.loading
)