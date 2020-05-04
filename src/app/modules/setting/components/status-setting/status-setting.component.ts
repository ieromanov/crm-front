import { Component, Inject } from '@angular/core';

import { STATUS_SERVICE } from '@core/di-tokens';
import { NzTableQueryParams, NzModalService } from 'ng-zorro-antd';
import { IStatusService } from '@shared/interfaces/service/status.service';
import { IStatus } from '@shared/interfaces/entity/status.interface';

import { StatusModalFormComponent } from '../status-modal/status-modal-from.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'crm-status-setting',
  templateUrl: './status-setting.component.html',
  styleUrls: ['./status-setting.component.scss'],
})
export class StatusSettingComponent {
  public totalResults: number;
  public statuses: IStatus[] = [];
  public loading: boolean = false;
  public pageSize: number = 9;
  public pageIndex: number = 1;

  public currentStatus: IStatus = null;
  public createStatusModalVisible: boolean = false;
  public createStatusModalLoading: boolean = false;

  constructor(
    @Inject(STATUS_SERVICE)
    private readonly statusService: IStatusService,
    private readonly modalService: NzModalService
  ) {}

  onQueryParamsChange(params: NzTableQueryParams) {
    const { pageIndex } = params;
    this.pageIndex = pageIndex;
    this._getAll();
  }

  public showDeleteConfirmModal(id: string) {
    this.modalService.confirm({
      nzTitle: 'Do you want to delete these status?',
      nzContent: 'When clicked the OK button, this status will be deleted',
      nzOkType: 'danger',
      nzOnOk: this._handleOnConfirmDelete(id),
    });
  }

  public showCreateStatusModal() {
    this.modalService.create({
      nzTitle: 'Create status',
      nzContent: StatusModalFormComponent,
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

  public showUpdateStatusModal(status: IStatus) {
    this.modalService.create({
      nzTitle: 'Update status',
      nzContent: StatusModalFormComponent,
      nzComponentParams: { status },
      nzFooter: [
        {
          label: 'Cancel',
          onClick: this._handleCloseModal,
        },
        {
          label: 'Update',
          type: 'primary',
          onClick: this._handleOnConfirmUpdate(status.id),
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

  private _handleOnConfirmCreate(componentInstance: StatusModalFormComponent) {
    if (componentInstance.form.valid) {
      this._create(componentInstance.form.value)
        .subscribe(() => {
          componentInstance.closeModal();
          this._getAll();
        });
    }
  }

  private _handleOnConfirmUpdate(id: string) {
    return (componentInstance: StatusModalFormComponent) => {
      if (componentInstance.form.value) {
        this._update(id, componentInstance.form.value)
          .subscribe(() => {
            componentInstance.closeModal();
            this._getAll();
          });
      }
    }
  }

  private _handleCloseModal(componentInstance: StatusModalFormComponent) {
    componentInstance.closeModal();
  }

  private _getAll() {
    this.loading = true;
    return this.statusService
      .getAll({
        take: this.pageSize,
        skip: (this.pageIndex - 1) * this.pageSize,
      })
      .subscribe((statuses) => {
        this.statuses = statuses.items;
        this.totalResults = statuses.total;
        this.loading = false;
      });
  }

  private _delete(id: string) {
    return this.statusService.delete(id);
  }

  private _create(status: IStatus): Observable<IStatus> {
    return this.statusService.create(status);
  }

  private _update(id: string, status: IStatus): Observable<IStatus> {
    return this.statusService.update(id, status);
  }
}
