import { createAction, props } from '@ngrx/store';
import { IHomeType } from '@shared/interfaces/entity/home.interface';

enum HomeTypeDictionaryActionTypes {
  loadHomeTypes = '[HomeType Dictionary] load statuses',
  loadHomeTypesFail = '[HomeType Dictionary] fail load statuses',

  addOneHomeType = '[HomeType Dictionary] add one status',
  addManyHomeTypes = '[HomeType Dictionary] add many statuses',

  removeOneHomeType = '[HomeType Dictionary] remove one status',
  removeManyHomeTypes = '[HomeType Dictionary] remove many statuses',

  updateOneHomeType = '[HomeType Dictionary] update one status',
  updateManyHomeTypes = '[HomeType Dictionary] update many statuses',
}

export const loadHomeTypesAction = createAction(
  HomeTypeDictionaryActionTypes.loadHomeTypes
);
export const loadHomeTypesFailAction = createAction(
  HomeTypeDictionaryActionTypes.loadHomeTypesFail
);

export const addOneHomeTypeAction = createAction(
  HomeTypeDictionaryActionTypes.addOneHomeType,
  props<IHomeType>()
);
export const addManyHomeTypesAction = createAction(
  HomeTypeDictionaryActionTypes.addManyHomeTypes,
  props<{ homeTypes: IHomeType[] }>()
);

export const removeOneHomeTypeAction = createAction(
  HomeTypeDictionaryActionTypes.removeOneHomeType,
  props<{ id: string }>()
);
export const removeManyHomeTypesAction = createAction(
  HomeTypeDictionaryActionTypes.removeManyHomeTypes,
  props<{ ids: string[] }>()
);

export const updateOneHomeTypeAction = createAction(
  HomeTypeDictionaryActionTypes.updateOneHomeType,
  props<{ id: string, changes: IHomeType }>()
);
export const updateManyHomeTypesAction = createAction(
  HomeTypeDictionaryActionTypes.updateManyHomeTypes,
  props<{ updates: { id: string, changes: IHomeType }[] }>()
);