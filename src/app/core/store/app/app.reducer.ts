import { createReducer, on } from '@ngrx/store';
import { startLoadingAction, finishLoadingAction, finishFirstLoadingAction } from './app.action';

export interface IAppState {
  loadingCount: number;
  firstLoadingFinished: boolean;
}

export const initialState: IAppState = {
  loadingCount: 0,
  firstLoadingFinished: false
};

export const appReducer = createReducer(
  initialState,
  on(startLoadingAction, (state) => ({ ...state, loadingCount: state.loadingCount + 1 })),
  on(finishLoadingAction, (state) => ({ ...state, loadingCount: state.loadingCount > 0 ? state.loadingCount - 1 : 0 })),

  on(finishFirstLoadingAction, (state) => ({ ...state, firstLoadingFinished: true }))
);
