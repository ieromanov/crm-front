import { EntityAdapter, createEntityAdapter, EntityState } from '@ngrx/entity';

import { createReducer, on } from '@ngrx/store';
import { IHomeType } from '@shared/interfaces/entity/home.interface';
import {
  setManyHomeTypesAction,
  setOneHomeTypeAction,
} from './home-type-dictionary.action';

export interface IHomeTypeDictionaryState extends EntityState<IHomeType> {}

export const adapter: EntityAdapter<IHomeType> = createEntityAdapter<IHomeType>();

export const initialState: IHomeTypeDictionaryState = adapter.getInitialState();

export const homeTypesDictionaryReducer = createReducer(
  initialState,
  on(setOneHomeTypeAction, (state, home) => adapter.addOne(home, state)),
  on(setManyHomeTypesAction, (state, { homeTypes }) => adapter.addMany(homeTypes, state))
);
