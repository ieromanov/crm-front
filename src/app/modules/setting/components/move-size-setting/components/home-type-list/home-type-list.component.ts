import { Component, Input, EventEmitter, Output } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd';

import { ConstantService } from '@core/services/constant.service';
import { HomeTypeService } from '@core/services/home-type.service';

import { IRoom } from '@shared/interfaces/entity/room.interface';
import { IHomeType } from '@shared/interfaces/entity/home.interface';
import { validateForm } from '@shared/helpers/validate-form-group.helper';

import { HomeTypeFormComponent } from '../home-type-form/home-type-form.component';

@Component({
  selector: 'crm-home-type-list',
  templateUrl: 'home-type-list.component.html',
})
export class HomeTypeListComponent {
  @Input() homeTypes: IHomeType[] = []

  @Output() onSuccessCreate: EventEmitter<IHomeType> = new EventEmitter<IHomeType>()
  @Output() onSuccessDelete: EventEmitter<string> = new EventEmitter<string>()
  @Output() onSuccessUpdate: EventEmitter<{ id: string, changes: IHomeType }> = new EventEmitter<{ id: string, changes: IHomeType }>()

  public get colorsConstants() {
    return this._constantService.colors;
  }

  constructor(
    private readonly _constantService: ConstantService,
    private readonly _homeTypeService: HomeTypeService,
    private readonly _modalService: NzModalService,
  ) {}

  public showConfirmDeleteModal(id: string) {
    this._modalService.confirm({
      nzTitle: 'Do you want to delete these home type?',
      nzContent:
        'When clicked the OK button, this home type will be deleted',
      nzOkType: 'danger',
      nzOnOk: this._handleOnConfirmDelete(id),
    });
  }

  public showCreateModal() {
    this._modalService.create({
      nzTitle: 'Create home type',
      nzContent: HomeTypeFormComponent,
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

  public showUpdateModal(homeType: IHomeType) {
    this._modalService.create({
      nzTitle: 'Update home type',
      nzContent: HomeTypeFormComponent,
      nzComponentParams: { homeType },
      nzFooter: [
        {
          label: 'Cancel',
          onClick: this._handleCloseModal,
        },
        {
          label: 'Save',
          type: 'primary',
          onClick: this._handleOnConfirmUpdate(homeType.id),
        },
      ],
    });
  }

  private _handleOnConfirmCreate(componentInstance: HomeTypeFormComponent) {
    const formValid = validateForm(componentInstance.form)
    if (formValid) {
      const data = {
        ...componentInstance.form.value,
        rooms: componentInstance.rooms.filter(
          ({ id }: IRoom) => componentInstance.form.value.rooms.includes(id)
        )
      }
      this._homeTypeService
        .create(data)
        .subscribe((homeType: IHomeType) => {
          componentInstance.closeModal();
          this.onSuccessCreate.emit(homeType)
        });
    }
  }

  private _handleOnConfirmUpdate(id: string) {
    return (componentInstance: HomeTypeFormComponent) => {
      const formValid = validateForm(componentInstance.form)
      if (formValid) {
        const data = {
          ...componentInstance.form.value,
          rooms: componentInstance.rooms.filter(
            ({ id }: IRoom) => componentInstance.form.value.rooms.includes(id)
          )
        }
        this._homeTypeService.update(id, data).subscribe((changes: IHomeType) => {
          componentInstance.closeModal();
          this.onSuccessUpdate.emit({ id, changes })
        });
      }
    };
  }

  private _handleOnConfirmDelete(id: string) {
    return () => {
      this._homeTypeService.delete(id).subscribe(() => {
        this.onSuccessDelete.emit(id)
      });
    };
  }

  private _handleCloseModal(componentInstance: HomeTypeFormComponent) {
    componentInstance.closeModal();
  }
}
