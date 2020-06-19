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

export const serviceTypesDictionarySelector = createSelector(
  selectDictionariesState,
  (state: IDictionariesState) => state.serviceTypes,
)
export const serviceTypesDictionaryEntitiesSelector = createSelector(
  serviceTypesDictionarySelector,
  (serviceTypes: IHomeTypeDictionaryState) => Object.values(serviceTypes.entities)
)

export const roomDictionarySelector = createSelector(
  selectDictionariesState,
  (state: IDictionariesState) => state.room,
)
export const roomDictionaryEntitiesSelector = createSelector(
  roomDictionarySelector,
  (room: IHomeTypeDictionaryState) => Object.values(room.entities)
)
