import { Component, Inject } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { API_SERVICE } from '@core/di-tokens';
import { IApiService } from '@shared/interfaces/api-service.interface';
import { NzTableQueryParams } from 'ng-zorro-antd';

@Component({
  selector: 'crm-request-status-setting',
  templateUrl: './request-status-setting.component.html',
  styleUrls: ['./request-status-setting.component.scss'],
})
export class StatusSettingComponent {
  public totalResults: number;
  public statuses: any[] = [];
  public loading: boolean = false;
  public pageSize: number = 5;
  public pageIndex: number = 1;

  constructor(
    @Inject(API_SERVICE)
    private readonly apiService: IApiService
  ) {}

  getStatuses() {
    this.loading = true
    return this.apiService
      .get('/request-status', {
        params: {
          take: this.pageSize,
          skip: this.pageIndex - 1,
        },
      })
      .pipe(catchError((err) => of(err)))
      .subscribe((statuses) => {
        this.statuses = statuses.items;
        this.totalResults = statuses.total;
        this.loading = false;
      });
  }

  onQueryParamsChange(params: NzTableQueryParams) {
    const { pageIndex } = params;
    this.pageIndex = pageIndex
    this.getStatuses()
  }

  save() {}
}
