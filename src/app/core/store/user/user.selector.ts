import { createSelector, createFeatureSelector } from '@ngrx/store'
import { State } from '@store/index'
import { IUserState } from '@store/user/user.reducer'

export const selectUserState =  createFeatureSelector<State, IUserState>('user');

export const userInfoSelector = createSelector(
  selectUserState,
  (state: IUserState) => state.info
)

export const loginErrorSelector = createSelector(
  selectUserState,
  (state: IUserState) => state.loginError
)
