import { EntityAdapter, createEntityAdapter, EntityState } from '@ngrx/entity';

import { createReducer, on } from '@ngrx/store';
import { IHomeType } from '@shared/interfaces/entity/home.interface';
import {
  addManyAction,
  addOneAction,
  removeOneAction,
  removeManyAction,
  updateOneAction,
  updateManyAction,
} from './home-type-dictionary.action';

export interface IHomeTypeDictionaryState extends EntityState<IHomeType> {}

export const adapter: EntityAdapter<IHomeType> = createEntityAdapter<IHomeType>();

export const initialState: IHomeTypeDictionaryState = adapter.getInitialState();

export const homeTypesDictionaryReducer = createReducer(
  initialState,
  on(addOneAction, (state, home) => adapter.addOne(home, state)),
  on(addManyAction, (state, { entities }) => adapter.addMany(entities, state)),

  on(removeOneAction, (state, { id }) => adapter.removeOne(id, state)),
  on(removeManyAction, (state, { ids }) => adapter.removeMany(ids, state)),

  on(updateOneAction, (state, update) => adapter.updateOne(update, state)),
  on(updateManyAction, (state, { updates }) => adapter.updateMany(updates, state)),
);
