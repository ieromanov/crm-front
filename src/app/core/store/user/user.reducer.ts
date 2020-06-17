import { createReducer, on, Action } from '@ngrx/store';
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

export interface IUserState {
  info: UserInfo
}

export const initialState: IUserState = {
  info: null
};

export const userReducer = createReducer(
  initialState,
  on(loginAction, state => ({ ...state, info: null })),
  on(loginSuccessAction, (state, info: UserInfo) => ({ ...state, info })),
  on(loginFailAction, state => ({ ...state, info: null })),
  
  on(getUserInfoAction, state => ({ ...state, info: null,})),
  on(getUserInfoSuccessAction, (state, info) => ({ ...state, info })),
  on(getUserInfoFailAction, state => ({ ...state, info: null })),

  on(logoutAction, state => ({ ...state, info: null,})),
  on(logoutSuccessAction, state => ({ ...state, info: null })),
  on(logoutFailAction, state => ({ ...state, info: null })),
);
