import { createAction, props } from '@ngrx/store';
import { IStatus } from '@shared/interfaces/entity/status.interface';

enum StatusDictionaryActionTypes {
  loadStatuses = '[Status Dictionary] load statuses',

  setOneStatus = '[Status Dictionary] set one status',
  setManyStatuses = '[Status Dictionary] set many statuses',

  removeOneStatus = '[Status Dictionary] remove one status',
  removeManyStatuses = '[Status Dictionary] remove many statuses',

  updateOneStatus = '[Status Dictionary] update one status',
  updateManyStatuses = '[Status Dictionary] update many statuses',
}

export const loadStatusesAction = createAction(
  StatusDictionaryActionTypes.loadStatuses
);

export const setOneStatusAction = createAction(
  StatusDictionaryActionTypes.setOneStatus,
  props<IStatus>()
);
export const setManyStatusesAction = createAction(
  StatusDictionaryActionTypes.setManyStatuses,
  props<{ statuses: IStatus[] }>()
);

export const removeOneStatusAction = createAction(
  StatusDictionaryActionTypes.removeOneStatus,
  props<{ id: string }>()
);
export const removeManyStatusesAction = createAction(
  StatusDictionaryActionTypes.removeManyStatuses,
  props<{ ids: string[] }>()
);

export const updateOneStatusAction = createAction(
  StatusDictionaryActionTypes.updateOneStatus,
  props<{ id: string, changes: IStatus }>()
);
export const updateManyStatusesAction = createAction(
  StatusDictionaryActionTypes.updateManyStatuses,
  props<{ updates: { id: string, changes: IStatus }[] }>()
);
