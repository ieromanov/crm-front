import { EntityAdapter, createEntityAdapter, EntityState } from '@ngrx/entity';

import { createReducer, on } from '@ngrx/store';
import { IStatus } from '@shared/interfaces/entity/status.interface';
import {
  addManyAction,
  addOneAction,
  removeOneAction,
  removeManyAction,
  updateOneAction,
  updateManyAction,
} from './status-dictionary.action';

export interface IStatusDictionaryState extends EntityState<IStatus> {}

export const adapter: EntityAdapter<IStatus> = createEntityAdapter<IStatus>();

export const initialState: IStatusDictionaryState = adapter.getInitialState();

export const statusDictionaryReducer = createReducer(
  initialState,
  on(addOneAction, (state, status) => adapter.addOne(status, state)),
  on(addManyAction, (state, { entities }) => adapter.addMany(entities, state)),

  on(removeOneAction, (state, { id }) => adapter.removeOne(id, state)),
  on(removeManyAction, (state, { ids }) => adapter.removeMany(ids, state)),

  on(updateOneAction, (state, update) => adapter.updateOne(update, state)),
  on(updateManyAction, (state, { updates }) => adapter.updateMany(updates, state)),
);
