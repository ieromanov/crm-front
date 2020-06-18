import { Component, Input, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd';
import { IHomeType } from '@shared/interfaces/entity/home.interface';
import {
  HOME_NAME_MAX_LENGTH,
  HOME_DESCRIPTION_MAX_LENGTH,
} from './home-form.constants';
import { ROOM_SERVICE } from '@core/di-tokens';
import { IRoomService } from '@shared/interfaces/service/room-service.interface';
import { IRoom } from '@shared/interfaces/entity/room.interface';

@Component({
  selector: 'crm-home-form',
  templateUrl: 'home-form.component.html',
})
export class HomeFormComponent implements OnInit {
  @Input() public homeType: IHomeType = null;

  public form: FormGroup;
  public rooms: IRoom[]
  public selectedRooms: IRoom[]

  constructor(
    @Inject(ROOM_SERVICE)
    private readonly _roomService: IRoomService,
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
