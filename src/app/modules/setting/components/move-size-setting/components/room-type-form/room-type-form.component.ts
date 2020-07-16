import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd';

import { IRoom } from '@shared/interfaces/entity/room.interface';
import {
  ROOM_NAME_MAX_LENGTH,
  ROOM_DESCRIPTION_MAX_LENGTH,
} from './room-type-form.constants';

@Component({
  selector: 'crm-room-type-form',
  templateUrl: 'room-type-form.component.html',
})
export class RoomTypeFormComponent implements OnInit {
  @Input() public room: IRoom = null;

  public form: FormGroup;

  constructor(
    private modalRef: NzModalRef,
    private readonly formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    const room = this.initRoom();

    this.form = this.formBuilder.group({
      name: [
        room.name,
        [Validators.required, Validators.maxLength(ROOM_NAME_MAX_LENGTH)],
      ],
      description: [
        room.description,
        [Validators.maxLength(ROOM_DESCRIPTION_MAX_LENGTH)],
      ],
      volume: [
        room.volume,
        [Validators.required, Validators.min(1)],
      ],
      active: [room.active],
    });
  }

  initRoom(): IRoom {
    return this.room !== null
      ? this.room
      : {
          name: 'new room name',
          description: null,
          volume: 0,
          active: true,
        };
  }

  closeModal() {
    this.modalRef.destroy();
  }
}
