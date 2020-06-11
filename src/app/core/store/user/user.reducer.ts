import {
  EntityAdapter,
  createEntityAdapter,
  EntityState,
} from '@ngrx/entity';

import { UserInfo } from '@shared/types/user-info.type'
import {
  loginAction,
  loginSuccessAction,
  loginFailAction,
  getUserInfoAction,
  getUserInfoSuccessAction,
  getUserInfoFailAction,
  logoutAction,
  logoutSuccessAction,
  logoutFailAction
} from '@store/user/user.action';
import { createReducer, on, Action } from '@ngrx/store';

export interface UserState extends EntityState<UserInfo> {
  loading: boolean;
  info: UserInfo;
  error: boolean;
}

export const adapter: EntityAdapter<UserInfo> = createEntityAdapter<UserInfo>();

export const initialState: UserState = adapter.getInitialState({
  loading: true,
  info: null,
  error: null
});

const _reducer = createReducer(
  initialState,
  on(loginAction, state => ({ ...state, loading: true, error: false, info: null })),
  on(loginSuccessAction, (state, info: UserInfo) => ({ ...state, loading: false, error: false, info })),
  on(loginFailAction, state => ({ ...state, info: null, loading: false, error: true })),
  
  on(getUserInfoAction, state => ({ ...state, info: null, loading: true, error: false })),
  on(getUserInfoSuccessAction, (state, info) => ({ ...state, loading: false, error: false, info })),
  on(getUserInfoFailAction, state => ({ ...state, info: null, loading: false, error: true })),

  on(logoutAction, state => ({ ...state, info: null, loading: true, error: false })),
  on(logoutSuccessAction, state => ({ ...state, loading: false, error: false, info: null })),
  on(logoutFailAction, state => ({ ...state, info: null, loading: false, error: true })),
);

export function userReducer(state: UserState | undefined, action: Action) {
  return _reducer(state, action);
}