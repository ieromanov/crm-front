import { createAction, props } from '@ngrx/store';
import { IStatus } from '@shared/interfaces/entity/status.interface';

enum StatusDictionaryActionTypes {
  load = '[Status Dictionary] load statuses',
  loadFail = '[Status Dictionary] fail load statuses',

  addOne = '[Status Dictionary] add one status',
  addMany = '[Status Dictionary] add many statuses',

  removeOne = '[Status Dictionary] remove one status',
  removeMany = '[Status Dictionary] remove many statuses',

  updateOne = '[Status Dictionary] update one status',
  updateMany = '[Status Dictionary] update many statuses',
}

export const loadAction = createAction(
  StatusDictionaryActionTypes.load
);
export const loadFailAction = createAction(
  StatusDictionaryActionTypes.loadFail
);

export const addOneAction = createAction(
  StatusDictionaryActionTypes.addOne,
  props<IStatus>()
);
export const addManyAction = createAction(
  StatusDictionaryActionTypes.addMany,
  props<{ entities: IStatus[] }>()
);

export const removeOneAction = createAction(
  StatusDictionaryActionTypes.removeOne,
  props<{ id: string }>()
);
export const removeManyAction = createAction(
  StatusDictionaryActionTypes.removeMany,
  props<{ ids: string[] }>()
);

export const updateOneAction = createAction(
  StatusDictionaryActionTypes.updateOne,
  props<{ id: string, changes: IStatus }>()
);
export const updateManyAction = createAction(
  StatusDictionaryActionTypes.updateMany,
  props<{ updates: { id: string, changes: IStatus }[] }>()
);
