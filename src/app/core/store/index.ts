import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';

import { environment } from '@env/environment';

import { AppEffects } from '@store/app/app.effect';
import { IAppState, appReducer } from '@store/app/app.reducer';
import { UserEffects } from '@store/user/user.effect';
import { IUserState, userReducer } from '@store/user/user.reducer';
import {
  IDictionariesState,
  dictionariesReducer,
} from '@store/dictionaries/dictionaries.reducer';
import { StatusDictionaryEffects } from '@store/dictionaries/status-dictionary/status-dictionary.effect';
import { HomeTypeDictionaryEffects } from '@store/dictionaries/home-type-dictionary/home-type-dictionary.effect';
import { ServiceTypeDictionaryEffects } from '@store/dictionaries/service-type-dictionary/service-type-dictionary.effect';
import { RoomDictionaryEffects } from '@store/dictionaries/room-dictionary/room-dictionary.effect';

export interface State {
  app: IAppState;
  user: IUserState;
  dictionaries: IDictionariesState;
}

export const reducers: ActionReducerMap<State> = {
  app: appReducer,
  user: userReducer,
  dictionaries: dictionariesReducer,
};

export const effects = [
  UserEffects,
  AppEffects,
  StatusDictionaryEffects,
  HomeTypeDictionaryEffects,
  ServiceTypeDictionaryEffects,
  RoomDictionaryEffects
];

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? [storeFreeze]
  : [];
