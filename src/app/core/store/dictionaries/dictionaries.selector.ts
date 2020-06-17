import { createSelector, createFeatureSelector } from '@ngrx/store'
import { State } from '@store/index'
import { IDictionariesState } from './dictionaries.reducer';

export const selectDictionariesState =  createFeatureSelector<State, IDictionariesState>('dictionaries');

export const statusDictionarySelector = createSelector(
  selectDictionariesState,
  (state: IDictionariesState) => state.statuses
)