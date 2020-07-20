import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd';

import { ConstantService } from '@core/services/constant.service';
import { RoomService } from '@core/services/room.service';

import { IRoom } from '@shared/interfaces/entity/room.interface';
import { validateForm } from '@shared/helpers/validate-form-group.helper';

import { RoomTypeFormComponent } from '../room-type-form/room-type-form.component';

@Component({
  selector: 'crm-room-type-list',
  templateUrl: 'room-type-list.component.html',
})
export class RoomTypeListComponent {
  @Input() rooms: IRoom[] = []

  @Output() onSuccessCreate: EventEmitter<IRoom> = new EventEmitter<IRoom>()
  @Output() onSuccessDelete: EventEmitter<string> = new EventEmitter<string>()
  @Output() onSuccessUpdate: EventEmitter<{ id: string, changes: IRoom }> = new EventEmitter<{ id: string, changes: IRoom }>()

  public get colorsConstants() {
    return this._constantService.colors;
  }

  constructor(
    private readonly _constantService: ConstantService,
    private readonly _roomService: RoomService,
    private readonly _modalService: NzModalService,
  ) {}

  public showConfirmDeleteModal(id: string) {
    this._modalService.confirm({
      nzTitle: 'Do you want to delete these room type?',
      nzContent:
        'When clicked the OK button, this room type will be deleted',
      nzOkType: 'danger',
      nzOnOk: this._handleOnConfirmDelete(id),
    });
  }

  public showCreateModal() {
    this._modalService.create({
      nzTitle: 'Create room type',
      nzContent: RoomTypeFormComponent,
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

  public showUpdateModal(room: IRoom) {
    this._modalService.create({
      nzTitle: 'Update room type',
      nzContent: RoomTypeFormComponent,
      nzComponentParams: { room },
      nzFooter: [
        {
          label: 'Cancel',
          onClick: this._handleCloseModal,
        },
        {
          label: 'Save',
          type: 'primary',
          onClick: this._handleOnConfirmUpdate(room.id),
        },
      ],
    });
  }

  private _handleOnConfirmCreate(componentInstance: RoomTypeFormComponent) {
    const formValid = validateForm(componentInstance.form)
    if (formValid) {
      this._roomService
        .create(componentInstance.form.value)
        .subscribe((room: IRoom) => {
          componentInstance.closeModal();
          this.onSuccessCreate.emit(room)
        });
    }
  }

  private _handleOnConfirmUpdate(id: string) {
    return (componentInstance: RoomTypeFormComponent) => {
      const formValid = validateForm(componentInstance.form)
      if (formValid) {
        this._roomService.update(id, componentInstance.form.value)
          .subscribe((changes: IRoom) => {
            componentInstance.closeModal();
            this.onSuccessUpdate.emit({ id, changes })
          });
      }
    };
  }

  private _handleOnConfirmDelete(id: string) {
    return () => {
      this._roomService.delete(id).subscribe(() => {
        this.onSuccessDelete.emit(id)
      });
    };
  }

  private _handleCloseModal(componentInstance: RoomTypeFormComponent) {
    componentInstance.closeModal();
  }
}
