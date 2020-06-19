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
import {
  initialState as serviceTypeInitialState,
  serviceTypesDictionaryReducer,
  IServiceTypeDictionaryState,
} from './service-type-dictionary/service-type-dictionary.reducer';
import {
  initialState as roomInitialState,
  roomDictionaryReducer,
  IRoomDictionaryState,
} from './room-dictionary/room-dictionary.reducer';

export interface IDictionariesState {
  statuses: IStatusDictionaryState;
  homeTypes: IHomeTypeDictionaryState;
  serviceTypes: IServiceTypeDictionaryState;
  room: IRoomDictionaryState;
}

export const initialState: IDictionariesState = {
  statuses: statusInitialState,
  homeTypes: homeTypeInitialState,
  serviceTypes: serviceTypeInitialState,
  room: roomInitialState
};

export const dictionariesReducer = combineReducers(
  {
    statuses: statusDictionaryReducer,
    homeTypes: homeTypesDictionaryReducer,
    serviceTypes: serviceTypesDictionaryReducer,
    room: roomDictionaryReducer
  },
  initialState
);
