import { createAction, props } from '@ngrx/store';
import { IRoom } from '@shared/interfaces/entity/room.interface';

enum RoomDictionaryActionTypes {
  load = '[Room Dictionary] load statuses',
  loadFail = '[Room Dictionary] fail load statuses',

  addOne = '[Room Dictionary] add one status',
  addMany = '[Room Dictionary] add many statuses',

  removeOne = '[Room Dictionary] remove one status',
  removeMany = '[Room Dictionary] remove many statuses',

  updateOne = '[Room Dictionary] update one status',
  updateMany = '[Room Dictionary] update many statuses',
}

export const loadAction = createAction(
  RoomDictionaryActionTypes.load
);
export const loadFailAction = createAction(
  RoomDictionaryActionTypes.loadFail
);

export const addOneAction = createAction(
  RoomDictionaryActionTypes.addOne,
  props<IRoom>()
);
export const addManyAction = createAction(
  RoomDictionaryActionTypes.addMany,
  props<{ entities: IRoom[] }>()
);

export const removeOneAction = createAction(
  RoomDictionaryActionTypes.removeOne,
  props<{ id: string }>()
);
export const removeManyAction = createAction(
  RoomDictionaryActionTypes.removeMany,
  props<{ ids: string[] }>()
);

export const updateOneAction = createAction(
  RoomDictionaryActionTypes.updateOne,
  props<{ id: string, changes: IRoom }>()
);
export const updateManyAction = createAction(
  RoomDictionaryActionTypes.updateMany,
  props<{ updates: { id: string, changes: IRoom }[] }>()
);
