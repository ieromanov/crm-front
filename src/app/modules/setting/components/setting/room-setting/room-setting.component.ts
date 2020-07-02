import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { NzTableQueryParams, NzModalService } from 'ng-zorro-antd';

import { RoomService } from '@core/services/room.service';
import { ConstantService } from '@core/services/constant.service';
import { IRoom } from '@shared/interfaces/entity/room.interface';

import { RoomFormComponent } from '../../form/room-form/room-form.component';

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
    private readonly _roomService: RoomService,
    private readonly _constantService: ConstantService,
    private readonly _modalService: NzModalService
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
    this._modalService.confirm({
      nzTitle: 'Do you want to delete these room?',
      nzContent: 'When clicked the OK button, this room will be deleted',
      nzOkType: 'danger',
      nzOnOk: this._handleOnConfirmDelete(id),
    });
  }

  public showCreateRoomModal() {
    this._modalService.create({
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
    this._modalService.create({
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
    return this._roomService
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
    return this._roomService.delete(id);
  }

  private _create(room: IRoom): Observable<IRoom> {
    return this._roomService.create(room);
  }

  private _update(id: string, room: IRoom): Observable<IRoom> {
    return this._roomService.update(id, room);
  }
}
