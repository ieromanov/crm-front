import {
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';

import { environment } from '@env/environment';

import { UserEffects } from '@store/user/user.effect';
import { UserState, userReducer } from '@store/user/user.reducer';
import { AppState, appReducer } from '@store/app/app.reducer';

export interface State {
  app: AppState,
  user: UserState,
}

export const reducers: ActionReducerMap<State> = {
  app: appReducer,
  user: userReducer
};

export const effects = [UserEffects];

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? [storeFreeze]
  : [];


