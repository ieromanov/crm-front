import { Component, Input, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd';
import { IHome } from '@shared/interfaces/entity/home.interface';
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
  @Input() public home: IHome = null;

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
    const home = this.initRoom();

    this.form = this._formBuilder.group({
      name: [
        home.name,
        [Validators.required, Validators.maxLength(HOME_NAME_MAX_LENGTH)],
      ],
      description: [
        home.description,
        [Validators.maxLength(HOME_DESCRIPTION_MAX_LENGTH)],
      ],
      rooms: [home.rooms.map(({ id }: IRoom) => id)],
      active: [home.active],
    });

    this._getRooms()
  }

  initRoom(): IHome {
    return this.home !== null
      ? this.home
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
