import { createAction, props } from '@ngrx/store';
import { IStatus } from '@shared/interfaces/entity/status.interface';

enum StatusDictionaryActionTypes {
  loadStatuses = '[Status Dictionary] load statuses',
  loadStatusesFail = '[Status Dictionary] fail load statuses',

  addOneStatus = '[Status Dictionary] add one status',
  addManyStatuses = '[Status Dictionary] add many statuses',

  removeOneStatus = '[Status Dictionary] remove one status',
  removeManyStatuses = '[Status Dictionary] remove many statuses',

  updateOneStatus = '[Status Dictionary] update one status',
  updateManyStatuses = '[Status Dictionary] update many statuses',
}

export const loadStatusesAction = createAction(
  StatusDictionaryActionTypes.loadStatuses
);
export const loadStatusesFailAction = createAction(
  StatusDictionaryActionTypes.loadStatusesFail
);

export const addOneStatusAction = createAction(
  StatusDictionaryActionTypes.addOneStatus,
  props<IStatus>()
);
export const addManyStatusesAction = createAction(
  StatusDictionaryActionTypes.addManyStatuses,
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
