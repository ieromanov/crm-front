import { EntityAdapter, createEntityAdapter, EntityState } from '@ngrx/entity';

import { createReducer, on } from '@ngrx/store';
import { IServiceType } from '@shared/interfaces/entity/service-type.interface';
import {
  addManyAction,
  addOneAction,
  removeOneAction,
  removeManyAction,
  updateOneAction,
  updateManyAction,
} from './service-type-dictionary.action';

export interface IServiceTypeDictionaryState extends EntityState<IServiceType> {}

export const adapter: EntityAdapter<IServiceType> = createEntityAdapter<IServiceType>();

export const initialState: IServiceTypeDictionaryState = adapter.getInitialState();

export const serviceTypesDictionaryReducer = createReducer(
  initialState,
  on(addOneAction, (state, status) => adapter.addOne(status, state)),
  on(addManyAction, (state, { entities }) => adapter.addMany(entities, state)),

  on(removeOneAction, (state, { id }) => adapter.removeOne(id, state)),
  on(removeManyAction, (state, { ids }) => adapter.removeMany(ids, state)),

  on(updateOneAction, (state, update) => adapter.updateOne(update, state)),
  on(updateManyAction, (state, { updates }) => adapter.updateMany(updates, state)),
);
