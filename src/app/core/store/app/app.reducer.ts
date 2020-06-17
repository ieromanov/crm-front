import { createReducer, on } from '@ngrx/store';
import { startLoadingAction, finishLoadingAction } from './app.action';

export interface IAppState {
  loadingCount: number;
}

export const initialState: IAppState = {
  loadingCount: 0,
};

export const appReducer = createReducer(
  initialState,
  on(startLoadingAction, (state) => ({ ...state, loadingCount: state.loadingCount + 1 })),
  on(finishLoadingAction, (state) => ({ ...state, loadingCount: state.loadingCount - 1})),
);
