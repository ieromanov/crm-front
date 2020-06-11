import {
  EntityAdapter,
  createEntityAdapter,
  EntityState,
} from '@ngrx/entity';

import { createReducer, on, Action } from '@ngrx/store';
import { setLoadingAction } from './app.action';

export interface AppState extends EntityState<{}> {
  loading: boolean;
}

export const adapter: EntityAdapter<{}> = createEntityAdapter<{}>();

export const initialState: AppState = adapter.getInitialState({
  loading: false,
});

const _reducer = createReducer(
  initialState,
  on(setLoadingAction, (state, { loading }) => ({ ...state, loading })),
);

export function appReducer(state: AppState | undefined, action: Action) {
  return _reducer(state, action);
}