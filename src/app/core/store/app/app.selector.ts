import { createSelector, createFeatureSelector } from '@ngrx/store'
import { State } from '@store/index'
import { IAppState } from '@store/app/app.reducer'

export const selectAppState =  createFeatureSelector<State, IAppState>('app');

export const loadingAppSelector = createSelector(
  selectAppState,
  (state: IAppState) => state.loadingCount > 0
)