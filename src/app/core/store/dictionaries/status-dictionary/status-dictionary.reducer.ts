import { EntityAdapter, createEntityAdapter, EntityState } from '@ngrx/entity';

import { createReducer, on } from '@ngrx/store';
import { IStatus } from '@shared/interfaces/entity/status.interface';
import {
  addManyStatusesAction,
  addOneStatusAction,
  removeOneStatusAction,
  removeManyStatusesAction,
  updateOneStatusAction,
  updateManyStatusesAction,
} from './status-dictionary.action';

export interface IStatusDictionaryState extends EntityState<IStatus> {}

export const adapter: EntityAdapter<IStatus> = createEntityAdapter<IStatus>();

export const initialState: IStatusDictionaryState = adapter.getInitialState();

export const statusDictionaryReducer = createReducer(
  initialState,
  on(addOneStatusAction, (state, status) => adapter.addOne(status, state)),
  on(addManyStatusesAction, (state, { statuses }) => adapter.addMany(statuses, state)),

  on(removeOneStatusAction, (state, { id }) => adapter.removeOne(id, state)),
  on(removeManyStatusesAction, (state, { ids }) => adapter.removeMany(ids, state)),

  on(updateOneStatusAction, (state, update) => adapter.updateOne(update, state)),
  on(updateManyStatusesAction, (state, { updates }) => adapter.updateMany(updates, state)),
);
