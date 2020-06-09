import { Component, Inject } from '@angular/core';

import { TRUCK_SERVICE } from '@core/di-tokens';
import { NzTableQueryParams, NzModalService } from 'ng-zorro-antd';
import { ITruckService } from '@shared/interfaces/service/truck-service.interface';
import { ITruck } from '@shared/interfaces/entity/truck.interface';

import { TruckModalFormComponent } from '../truck-modal/truck-modal-from.component';
import { Observable } from 'rxjs';

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
    @Inject(TRUCK_SERVICE)
    private readonly truckService: ITruckService,
    private readonly modalService: NzModalService
  ) {}

  onQueryParamsChange(params: NzTableQueryParams) {
    const { pageIndex } = params;
    this.pageIndex = pageIndex;
    this._getAll();
  }

  public showDeleteConfirmModal(id: string) {
    this.modalService.confirm({
      nzTitle: 'Do you want to delete these truck?',
      nzContent: 'When clicked the OK button, this truck will be deleted',
      nzOkType: 'danger',
      nzOnOk: this._handleOnConfirmDelete(id),
    });
  }

  public showCreateTruckModal() {
    this.modalService.create({
      nzTitle: 'Create truck',
      nzContent: TruckModalFormComponent,
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
    this.modalService.create({
      nzTitle: 'Update truck',
      nzContent: TruckModalFormComponent,
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
      await this._delete(id).toPromise();
      this._getAll();
    }
  }

  private _handleOnConfirmCreate(componentInstance: TruckModalFormComponent) {
    if (componentInstance.form.valid) {
      this._create(componentInstance.form.value)
        .subscribe(() => {
          componentInstance.closeModal();
          this._getAll();
        });
    }
  }

  private _handleOnConfirmUpdate(id: string) {
    return (componentInstance: TruckModalFormComponent) => {
      if (componentInstance.form.valid) {
        this._update(id, componentInstance.form.value)
          .subscribe(() => {
            componentInstance.closeModal();
            this._getAll();
          });
      }
    }
  }

  private _handleCloseModal(componentInstance: TruckModalFormComponent) {
    componentInstance.closeModal();
  }

  private _getAll() {
    this.loading = true;
    return this.truckService
      .findAll({
        take: this.pageSize,
        skip: (this.pageIndex - 1) * this.pageSize,
      })
      .subscribe((trucks) => {
        this.trucks = trucks.items;
        this.totalResults = trucks.total;
        this.loading = false;
      });
  }

  private _delete(id: string) {
    return this.truckService.delete(id);
  }

  private _create(truck: ITruck): Observable<ITruck> {
    return this.truckService.create(truck);
  }

  private _update(id: string, truck: ITruck): Observable<ITruck> {
    return this.truckService.update(id, truck);
  }
}
