import { Component, Inject } from '@angular/core';

import { STATUS_SERVICE } from '@core/di-tokens';
import { NzTableQueryParams, NzModalService } from 'ng-zorro-antd';
import { IStatusService } from '@shared/interfaces/service/status.service';
import { IStatus } from '@shared/interfaces/entity/status.interface';

@Component({
  selector: 'crm-status-setting',
  templateUrl: './status-setting.component.html',
  styleUrls: ['./status-setting.component.scss']
})
export class StatusSettingComponent {
  public totalResults: number;
  public statuses: IStatus[] = [];
  public loading: boolean = false;
  public pageSize: number = 10;
  public pageIndex: number = 1;

  constructor(
    @Inject(STATUS_SERVICE)
    private readonly statusService: IStatusService,
    private readonly modalService: NzModalService
  ) {}

  getStatuses() {
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

  onQueryParamsChange(params: NzTableQueryParams) {
    const { pageIndex } = params;
    this.pageIndex = pageIndex;
    this.getStatuses();
  }

  delete(id: string) {
    this.modalService.confirm({
      nzTitle: 'Do you want to delete these status?',
      nzContent: 'When clicked the OK button, this status will be deleted',
      nzOkType: 'danger',
      nzOnOk: () =>
        this.statusService
          .delete(id)
          .toPromise()
    });
  }

  create() {}
}
