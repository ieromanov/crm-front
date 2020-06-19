import { createAction, props } from '@ngrx/store';
import { IServiceType } from '@shared/interfaces/entity/service-type.interface';

enum ServiceTypeDictionaryActionTypes {
  load = '[ServiceType Dictionary] load statuses',
  loadFail = '[ServiceType Dictionary] fail load statuses',

  addOne = '[ServiceType Dictionary] add one status',
  addMany = '[ServiceType Dictionary] add many statuses',

  removeOne = '[ServiceType Dictionary] remove one status',
  removeMany = '[ServiceType Dictionary] remove many statuses',

  updateOne = '[ServiceType Dictionary] update one status',
  updateMany = '[ServiceType Dictionary] update many statuses',
}

export const loadAction = createAction(
  ServiceTypeDictionaryActionTypes.load
);
export const loadFailAction = createAction(
  ServiceTypeDictionaryActionTypes.loadFail
);

export const addOneAction = createAction(
  ServiceTypeDictionaryActionTypes.addOne,
  props<IServiceType>()
);
export const addManyAction = createAction(
  ServiceTypeDictionaryActionTypes.addMany,
  props<{ entities: IServiceType[] }>()
);

export const removeOneAction = createAction(
  ServiceTypeDictionaryActionTypes.removeOne,
  props<{ id: string }>()
);
export const removeManyAction = createAction(
  ServiceTypeDictionaryActionTypes.removeMany,
  props<{ ids: string[] }>()
);

export const updateOneAction = createAction(
  ServiceTypeDictionaryActionTypes.updateOne,
  props<{ id: string, changes: IServiceType }>()
);
export const updateManyAction = createAction(
  ServiceTypeDictionaryActionTypes.updateMany,
  props<{ updates: { id: string, changes: IServiceType }[] }>()
);
