import { EntityAdapter, createEntityAdapter, EntityState } from '@ngrx/entity';

import { createReducer, on } from '@ngrx/store';
import { IHomeType } from '@shared/interfaces/entity/home.interface';
import {
  addManyHomeTypesAction,
  addOneHomeTypeAction,
  removeOneHomeTypeAction,
  removeManyHomeTypesAction,
  updateOneHomeTypeAction,
  updateManyHomeTypesAction,
} from './home-type-dictionary.action';

export interface IHomeTypeDictionaryState extends EntityState<IHomeType> {}

export const adapter: EntityAdapter<IHomeType> = createEntityAdapter<IHomeType>();

export const initialState: IHomeTypeDictionaryState = adapter.getInitialState();

export const homeTypesDictionaryReducer = createReducer(
  initialState,
  on(addOneHomeTypeAction, (state, home) => adapter.addOne(home, state)),
  on(addManyHomeTypesAction, (state, { homeTypes }) => adapter.addMany(homeTypes, state)),

  on(removeOneHomeTypeAction, (state, { id }) => adapter.removeOne(id, state)),
  on(removeManyHomeTypesAction, (state, { ids }) => adapter.removeMany(ids, state)),

  on(updateOneHomeTypeAction, (state, update) => adapter.updateOne(update, state)),
  on(updateManyHomeTypesAction, (state, { updates }) => adapter.updateMany(updates, state)),
);
