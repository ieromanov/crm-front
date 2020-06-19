import { EntityAdapter, createEntityAdapter, EntityState } from '@ngrx/entity';

import { createReducer, on } from '@ngrx/store';
import { IRoom } from '@shared/interfaces/entity/room.interface';
import {
  addManyAction,
  addOneAction,
  removeOneAction,
  removeManyAction,
  updateOneAction,
  updateManyAction,
} from './room-dictionary.action';

export interface IRoomDictionaryState extends EntityState<IRoom> {}

export const adapter: EntityAdapter<IRoom> = createEntityAdapter<IRoom>();

export const initialState: IRoomDictionaryState = adapter.getInitialState();

export const roomDictionaryReducer = createReducer(
  initialState,
  on(addOneAction, (state, status) => adapter.addOne(status, state)),
  on(addManyAction, (state, { entities }) => adapter.addMany(entities, state)),

  on(removeOneAction, (state, { id }) => adapter.removeOne(id, state)),
  on(removeManyAction, (state, { ids }) => adapter.removeMany(ids, state)),

  on(updateOneAction, (state, update) => adapter.updateOne(update, state)),
  on(updateManyAction, (state, { updates }) => adapter.updateMany(updates, state)),
);
