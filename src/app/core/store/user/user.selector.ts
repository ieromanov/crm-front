import { createSelector, createFeatureSelector } from '@ngrx/store'
import { State } from '@store/index'
import { UserState } from '@store/user/user.reducer'

export const selectUserState =  createFeatureSelector<State, UserState>('user');

export const userInfoSelector = createSelector(
  selectUserState,
  (state: UserState) => state.info
)

export const loadingUserInfoSelector = createSelector(
  selectUserState,
  (state: UserState) => state.loading
)
