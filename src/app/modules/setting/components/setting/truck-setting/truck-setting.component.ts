import { Component } from '@angular/core';
import { NzTableQueryParams, NzModalService } from 'ng-zorro-antd';


import { TruckService } from '@core/services/truck.service';
import { ConstantService } from '@core/services/constant.service';

import { ITruck } from '@shared/interfaces/entity/truck.interface';

import { TruckFormComponent } from '../../form/truck-form/truck-form.component';

@Component({
  selector: 'crm-truck-setting',
  templateUrl: './truck-setting.component.html',
  styleUrls: ['./truck-setting.component.scss'],
})
export class TruckSettingComponent {
  public totalResults: number;
  public trucks: ITruck[] = [];
  public loading: boolean = false;
  public pageSize: number = 9;
  public pageIndex: number = 1;

  constructor(
    private readonly _truckService: TruckService,
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
      nzTitle: 'Do you want to delete these truck?',
      nzContent: 'When clicked the OK button, this truck will be deleted',
      nzOkType: 'danger',
      nzOnOk: this._handleOnConfirmDelete(id),
    });
  }

  public showCreateTruckModal() {
    this._modalService.create({
      nzTitle: 'Create truck',
      nzContent: TruckFormComponent,
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

  public showUpdateTruckModal(truck: ITruck) {
    this._modalService.create({
      nzTitle: 'Update truck',
      nzContent: TruckFormComponent,
      nzComponentParams: { truck },
      nzFooter: [
        {
          label: 'Cancel',
          onClick: this._handleCloseModal,
        },
        {
          label: 'Update',
          type: 'primary',
          onClick: this._handleOnConfirmUpdate(truck.id),
        },
      ],
    });
  }

  private _handleOnConfirmDelete(id: string) {
    return async () => {
      await this._truckService.delete(id).toPromise();
      this._getAll();
    }
  }

  private _handleOnConfirmCreate(componentInstance: TruckFormComponent) {
    if (componentInstance.form.valid) {
      this._truckService.create(componentInstance.form.value)
        .subscribe(() => {
          componentInstance.closeModal();
          this._getAll();
        });
    }
  }

  private _handleOnConfirmUpdate(id: string) {
    return (componentInstance: TruckFormComponent) => {
      if (componentInstance.form.valid) {
        this._truckService.update(id, componentInstance.form.value)
          .subscribe(() => {
            componentInstance.closeModal();
            this._getAll();
          });
      }
    }
  }

  private _handleCloseModal(componentInstance: TruckFormComponent) {
    componentInstance.closeModal();
  }

  private _getAll() {
    this.loading = true;
    return this._truckService
      .findAll({
        limit: this.pageSize,
        page: this.pageIndex,
      })
      .subscribe((trucks) => {
        this.trucks = trucks.data;
        this.totalResults = trucks.total;
        this.loading = false;
      });
  }
}
