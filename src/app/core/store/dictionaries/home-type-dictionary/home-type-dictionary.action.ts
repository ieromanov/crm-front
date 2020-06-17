import { createAction, props } from '@ngrx/store';
import { IHomeType } from '@shared/interfaces/entity/home.interface';

enum HomeDictionaryActionTypes {
  loadHomeTypes = '[Home Dictionary] load home types',

  setOneHomeType = '[Home Dictionary] set one home type',
  setManyHomeTypes = '[Home Dictionary] set many home types',
}

export const loadHomeTypesAction = createAction(
  HomeDictionaryActionTypes.loadHomeTypes
);

export const setOneHomeTypeAction = createAction(
  HomeDictionaryActionTypes.setOneHomeType,
  props<IHomeType>()
);
export const setManyHomeTypesAction = createAction(
  HomeDictionaryActionTypes.setManyHomeTypes,
  props<{ homeTypes: IHomeType[] }>()
);
