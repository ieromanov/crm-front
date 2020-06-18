import { createSelector, createFeatureSelector } from '@ngrx/store'
import { State } from '@store/index'
import { IDictionariesState } from './dictionaries.reducer';
import { IStatusDictionaryState } from './status-dictionary/status-dictionary.reducer';
import { IHomeTypeDictionaryState } from './home-type-dictionary/home-type-dictionary.reducer';

export const selectDictionariesState =  createFeatureSelector<State, IDictionariesState>('dictionaries');

export const statusDictionarySelector = createSelector(
  selectDictionariesState,
  (state: IDictionariesState) => state.statuses,
)

export const statusDictionaryEntitiesSelector = createSelector(
  statusDictionarySelector,
  (statuses: IStatusDictionaryState) => Object.values(statuses.entities)
)

export const homeTypesDictionarySelector = createSelector(
  selectDictionariesState,
  (state: IDictionariesState) => state.homeTypes,
)

export const homeTypesDictionaryEntitiesSelector = createSelector(
  homeTypesDictionarySelector,
  (homeTypes: IHomeTypeDictionaryState) => Object.values(homeTypes.entities)
)