import { Component, OnInit } from '@angular/core';
import { NzModalService, NzNotificationService } from 'ng-zorro-antd';

import { ConstantService } from '@core/services/constant.service';
import { SalePeakRatesService } from '@core/services/sale-peak-rates.service';

import { ISalePeakRate } from '@shared/interfaces/entity/sale-rates.interface';

import { SalePeakRateFormComponent } from './components/sale-peak-rate-form/sale-peak-rate-form.component';

@Component({
  selector: 'crm-rates-setting',
  templateUrl: 'rates-setting.component.html',
})
export class RatesSettingComponent implements OnInit {
  public rates: ISalePeakRate[] = [];
  public loading: boolean = false;

  constructor(
    private readonly _salePeakRatesService: SalePeakRatesService,
    private readonly _constantService: ConstantService,
    private readonly _modalService: NzModalService,
    private readonly _notificationService: NzNotificationService
  ) {}

  ngOnInit(): void {
    this._getAll();
  }

  public get colorsConstants() {
    return this._constantService.colors;
  }

  public showDeleteConfirmModal(id: string) {
    this._modalService.confirm({
      nzTitle: 'Do you want to delete these rate?',
      nzContent: 'When clicked the OK button, this rate will be deleted',
      nzOkType: 'danger',
      nzOnOk: this._handleOnConfirmDelete(id),
    });
  }

  public showCreateModal() {
    this._modalService.create({
      nzTitle: 'Create room',
      nzContent: SalePeakRateFormComponent,
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

  public showUpdateModal(rate: ISalePeakRate) {
    this._modalService.create({
      nzTitle: 'Update rate',
      nzContent: SalePeakRateFormComponent,
      nzComponentParams: { rate },
      nzFooter: [
        {
          label: 'Cancel',
          onClick: this._handleCloseModal,
        },
        {
          label: 'Update',
          type: 'primary',
          onClick: this._handleOnConfirmUpdate(rate.id),
        },
      ],
    });
  }

  private _handleOnConfirmDelete(id: string) {
    return () => {
      this._salePeakRatesService
        .delete(id)
        .subscribe(this._getAll.bind(this), (error) => {
          this._notificationService.create(
            'error',
            'User not deleted',
            error.detail
          );
        });
    };
  }

  private _handleOnConfirmCreate(componentInstance: SalePeakRateFormComponent) {
    if (componentInstance.form.valid) {
      this._salePeakRatesService.create(componentInstance.form.value).subscribe(
        () => {
          componentInstance.closeModal();
          this._getAll();
        },
        (error) => {
          this._notificationService.create(
            'error',
            'Rate not created',
            error.detail
          );
        }
      );
    }
  }

  private _handleOnConfirmUpdate(id: string) {
    return (componentInstance: SalePeakRateFormComponent) => {
      if (componentInstance.form.valid) {
        this._salePeakRatesService
          .update(id, componentInstance.form.value)
          .subscribe(() => {
            componentInstance.closeModal();
            this._getAll();
          });
      }
    };
  }

  private _handleCloseModal(componentInstance: SalePeakRateFormComponent) {
    componentInstance.closeModal();
  }

  private _getAll() {
    this.loading = true;
    return this._salePeakRatesService.findAll().subscribe((rates) => {
      this.rates = rates.data;
      this.loading = false;
    });
  }
}
