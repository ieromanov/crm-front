import { combineReducers } from '@ngrx/store';

import {
  initialState as statusInitialState,
  IStatusDictionaryState,
  statusDictionaryReducer,
} from './status-dictionary/status-dictionary.reducer';
import {
  initialState as homeTypeInitialState,
  homeTypesDictionaryReducer,
  IHomeTypeDictionaryState,
} from './home-type-dictionary/home-type-dictionary.reducer';

export interface IDictionariesState {
  statuses: IStatusDictionaryState;
  homeTypes: IHomeTypeDictionaryState;
}

export const initialState: IDictionariesState = {
  statuses: statusInitialState,
  homeTypes: homeTypeInitialState,
};

export const dictionariesReducer = combineReducers(
  {
    statuses: statusDictionaryReducer,
    homeTypes: homeTypesDictionaryReducer,
  },
  initialState
);
