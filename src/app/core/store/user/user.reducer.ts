import { createReducer, on } from '@ngrx/store';

import { UserInfo } from '@shared/types/user-info.type'
import { HttpErrorType } from '@shared/types/error.type';

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
  info: UserInfo,
  loginError: string
}

export const initialState: IUserState = {
  info: null,
  loginError: null
};

export const userReducer = createReducer(
  initialState,
  on(loginAction, state => ({ info: null, loginError: null })),
  on(loginSuccessAction, (state, info: UserInfo) => ({ info, loginError: null })),
  on(loginFailAction, (state, { error }: { error: string }) => ({ info: null, loginError: error })),
  
  on(getUserInfoAction, state => ({ ...state, info: null })),
  on(getUserInfoSuccessAction, (state, info) => ({ ...state, info })),
  on(getUserInfoFailAction, state => ({ ...state, info: null })),

  on(logoutAction, state => ({ ...state, info: null })),
  on(logoutSuccessAction, state => ({ ...state, info: null })),
  on(logoutFailAction, state => ({ ...state, info: null })),
);
