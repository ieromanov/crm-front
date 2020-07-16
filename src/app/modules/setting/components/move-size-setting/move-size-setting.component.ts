import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { IHomeType } from '@shared/interfaces/entity/home.interface';
import { IRoom } from '@shared/interfaces/entity/room.interface';

import { State } from "@store/index";
import { homeTypesDictionaryEntitiesSelector } from '@store/dictionaries/dictionaries.selector';
import { roomDictionaryEntitiesSelector } from '@store/dictionaries/dictionaries.selector';
import {
  addOneAction as addOneHomeTypeAction,
  updateOneAction as updateOneHomeTypeAction,
  removeOneAction as removeOneHomeTypeAction,
} from '@store/dictionaries/home-type-dictionary/home-type-dictionary.action';
import {
  addOneAction as addOneRoomAction,
  updateOneAction as updateOneRoomAction,
  removeOneAction as removeOneRoomAction,
} from '@store/dictionaries/room-dictionary/room-dictionary.action';

@Component({
  selector: 'crm-move-size-setting',
  templateUrl: './move-size-setting.component.html',
})
export class MoveSizeSettingComponent {
  public homeTypes$: Observable<IHomeType[]> = this._store.select(
    homeTypesDictionaryEntitiesSelector
  );
  public rooms$: Observable<IRoom[]> = this._store.select(
    roomDictionaryEntitiesSelector
  );

  constructor(private readonly _store: Store<State>) {}

  handleOnSuccessCreateHomeType(homeType: IHomeType) {
    this._store.dispatch(addOneHomeTypeAction(homeType));
  }
  handleOnSuccessUpdateHomeType({ id, changes }: { id: string, changes: IHomeType }) {
    this._store.dispatch(updateOneHomeTypeAction({ id, changes }));
  }
  handleOnSuccessDeleteHomeType(id: string) {
    this._store.dispatch(removeOneHomeTypeAction({ id }));
  }

  handleOnSuccessCreateRoom(homeType: IRoom) {
    this._store.dispatch(addOneRoomAction(homeType));
  }
  handleOnSuccessUpdateRoom({ id, changes }: { id: string, changes: IRoom }) {
    this._store.dispatch(updateOneRoomAction({ id, changes }));
  }
  handleOnSuccessDeleteRoom(id: string) {
    this._store.dispatch(removeOneRoomAction({ id }));
  }
}
