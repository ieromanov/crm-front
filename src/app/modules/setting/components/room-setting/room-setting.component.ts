import { Component, Inject } from '@angular/core';
import { Observable } from 'rxjs';

import { ROOM_SERVICE, CONSTANT_SERVICE } from '@core/di-tokens';
import { NzTableQueryParams, NzModalService } from 'ng-zorro-antd';
import { IRoomService } from '@shared/interfaces/service/room-service.interface';
import { IConstantService } from '@shared/interfaces/service/constant-service.interface';
import { IRoom } from '@shared/interfaces/entity/room.interface';

import { RoomFormComponent } from '../room-form/room-form.component';

@Component({
  selector: 'crm-room-setting',
  templateUrl: './room-setting.component.html',
  styleUrls: ['./room-setting.component.scss'],
})
export class RoomSettingComponent {
  public totalResults: number;
  public rooms: IRoom[] = [];
  public loading: boolean = false;
  public pageSize: number = 9;
  public pageIndex: number = 1;

  constructor(
    @Inject(ROOM_SERVICE)
    private readonly roomService: IRoomService,
    @Inject(CONSTANT_SERVICE)
    private readonly _constantService: IConstantService,
    private readonly modalService: NzModalService
  ) {}

  public get colorsConstants() {
    return this._constantService.colors
  }

  onQueryParamsChange(params: NzTableQueryParams) {
    const { pageIndex } = params;
    this.pageIndex = pageIndex;
    this._getAll();
  }

  public showDeleteConfirmModal(id: string) {
    this.modalService.confirm({
      nzTitle: 'Do you want to delete these room?',
      nzContent: 'When clicked the OK button, this room will be deleted',
      nzOkType: 'danger',
      nzOnOk: this._handleOnConfirmDelete(id),
    });
  }

  public showCreateRoomModal() {
    this.modalService.create({
      nzTitle: 'Create room',
      nzContent: RoomFormComponent,
      nzFooter: [
        {
          label: 'Cancel',
          onClick: this._handleCloseModal,
        },
        {
          label: 'Create',
          type: 'primary',
          onClick: this._handleOnConfirmCreate.bind(this),
        },
      ],
    });
  }

  public showUpdateRoomModal(room: IRoom) {
    this.modalService.create({
      nzTitle: 'Update room',
      nzContent: RoomFormComponent,
      nzComponentParams: { room },
      nzFooter: [
        {
          label: 'Cancel',
          onClick: this._handleCloseModal,
        },
        {
          label: 'Update',
          type: 'primary',
          onClick: this._handleOnConfirmUpdate(room.id),
        },
      ],
    });
  }

  private _handleOnConfirmDelete(id: string) {
    return async () => {
      await this._delete(id).toPromise();
      this._getAll();
    }
  }

  private _handleOnConfirmCreate(componentInstance: RoomFormComponent) {
    if (componentInstance.form.valid) {
      this._create(componentInstance.form.value)
        .subscribe(() => {
          componentInstance.closeModal();
          this._getAll();
        });
    }
  }

  private _handleOnConfirmUpdate(id: string) {
    return (componentInstance: RoomFormComponent) => {
      if (componentInstance.form.value) {
        this._update(id, componentInstance.form.value)
          .subscribe(() => {
            componentInstance.closeModal();
            this._getAll();
          });
      }
    }
  }

  private _handleCloseModal(componentInstance: RoomFormComponent) {
    componentInstance.closeModal();
  }

  private _getAll() {
    this.loading = true;
    return this.roomService
      .findAll({
        limit: this.pageSize,
        page: this.pageIndex,
      })
      .subscribe(rooms => {
        this.rooms = rooms.data;
        this.totalResults = rooms.total;
        this.loading = false;
      });
  }

  private _delete(id: string) {
    return this.roomService.delete(id);
  }

  private _create(room: IRoom): Observable<IRoom> {
    return this.roomService.create(room);
  }

  private _update(id: string, room: IRoom): Observable<IRoom> {
    return this.roomService.update(id, room);
  }
}
