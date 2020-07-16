import { Component, Input, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd';
import { IHomeType } from '@shared/interfaces/entity/home.interface';
import {
  HOME_NAME_MAX_LENGTH,
  HOME_DESCRIPTION_MAX_LENGTH,
} from './home-type-form.constants';
import { IRoom } from '@shared/interfaces/entity/room.interface';
import { RoomService } from '@core/services/room.service';

@Component({
  selector: 'crm-home-type-form',
  templateUrl: 'home-type-form.component.html',
})
export class HomeTypeFormComponent implements OnInit {
  @Input() public homeType: IHomeType = null;

  public form: FormGroup;
  public rooms: IRoom[]
  public selectedRooms: IRoom[]

  constructor(
    private readonly _roomService: RoomService,
    private readonly _modalRef: NzModalRef,
    private readonly _formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    const homeType = this.initRoom();

    this.form = this._formBuilder.group({
      name: [
        homeType.name,
        [Validators.required, Validators.maxLength(HOME_NAME_MAX_LENGTH)],
      ],
      description: [
        homeType.description,
        [Validators.maxLength(HOME_DESCRIPTION_MAX_LENGTH)],
      ],
      volume: [
        homeType.volume,
        [Validators.required, Validators.min(1)],
      ],
      rooms: [homeType.rooms.map(({ id }: IRoom) => id)],
      active: [homeType.active],
    });

    this._getRooms()
  }

  initRoom(): IHomeType {
    return this.homeType !== null
      ? this.homeType
      : {
          name: 'new home name',
          description: null,
          volume: 0,
          rooms: [],
          active: true,
        };
  }

  closeModal() {
    this._modalRef.destroy();
  }

  private _getRooms() {
    this._roomService
      .findAll()
      .subscribe(rooms => {
        this.rooms = rooms.data
      })
  }
}
