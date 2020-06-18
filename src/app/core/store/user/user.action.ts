import { createAction, props } from '@ngrx/store';
import { UserInfo } from '@shared/types/user-info.type';
import { LoginPayload } from '@shared/interfaces/login-payload.interface';

export enum UserActionTypes {
  login = '[User] login user',
  loginSuccess = '[User] login success',
  loginFail = '[User] login fail',

  getUserInfo = '[User] get user info',
  getUserInfoSuccess = '[User] get user info success',
  getUserInfoFail = '[User] get user info fail',

  logout = '[User] logout user',
  logoutSuccess = '[User] logout success',
  logoutFail = '[User] logout fail',
}

export const loginAction = createAction(
  UserActionTypes.login,
  props<LoginPayload>()
);
export const loginSuccessAction = createAction(
  UserActionTypes.loginSuccess,
  props<UserInfo>()
);
export const loginFailAction = createAction(UserActionTypes.loginFail);

export const getUserInfoAction = createAction(UserActionTypes.getUserInfo);
export const getUserInfoSuccessAction = createAction(
  UserActionTypes.getUserInfoSuccess,
  props<UserInfo>()
);
export const getUserInfoFailAction = createAction(
  UserActionTypes.getUserInfoFail
);

export const logoutAction = createAction(UserActionTypes.logout);
export const logoutSuccessAction = createAction(UserActionTypes.logoutSuccess);
export const logoutFailAction = createAction(UserActionTypes.logoutFail);
