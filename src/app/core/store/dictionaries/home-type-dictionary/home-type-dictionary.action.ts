import { createAction, props } from '@ngrx/store';
import { IHomeType } from '@shared/interfaces/entity/home.interface';

enum HomeTypeDictionaryActionTypes {
  load = '[HomeType Dictionary] load statuses',
  loadFail = '[HomeType Dictionary] fail load statuses',

  addOne = '[HomeType Dictionary] add one status',
  addMany = '[HomeType Dictionary] add many statuses',

  removeOne = '[HomeType Dictionary] remove one status',
  removeMany = '[HomeType Dictionary] remove many statuses',

  updateOne = '[HomeType Dictionary] update one status',
  updateMany = '[HomeType Dictionary] update many statuses',
}

export const loadAction = createAction(
  HomeTypeDictionaryActionTypes.load
);
export const loadFailAction = createAction(
  HomeTypeDictionaryActionTypes.loadFail
);

export const addOneAction = createAction(
  HomeTypeDictionaryActionTypes.addOne,
  props<IHomeType>()
);
export const addManyAction = createAction(
  HomeTypeDictionaryActionTypes.addMany,
  props<{ entities: IHomeType[] }>()
);

export const removeOneAction = createAction(
  HomeTypeDictionaryActionTypes.removeOne,
  props<{ id: string }>()
);
export const removeManyAction = createAction(
  HomeTypeDictionaryActionTypes.removeMany,
  props<{ ids: string[] }>()
);

export const updateOneAction = createAction(
  HomeTypeDictionaryActionTypes.updateOne,
  props<{ id: string, changes: IHomeType }>()
);
export const updateManyAction = createAction(
  HomeTypeDictionaryActionTypes.updateMany,
  props<{ updates: { id: string, changes: IHomeType }[] }>()
);