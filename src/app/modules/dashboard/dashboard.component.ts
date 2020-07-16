import { Component, OnDestroy } from '@angular/core';
import { NzTableQueryParams } from 'ng-zorro-antd';

import { RequestService } from '@core/services/request.service';
import { ConstantService } from '@core/services/constant.service';
import { RequestSocketService } from '@core/socket-services/request.socket-service';

import { IRequest } from '@shared/interfaces/entity/request.interface';
import { OrderTypeEmum } from '@shared/enum/order-type.enum';
import { SocketResponse } from '@shared/types/socket-response.type';

@Component({
  selector: 'crm-dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.scss'],
})
export class DashboardComponent implements OnDestroy {
  public totalResults: number;
  public requests: IRequest[] = [];
  public loading: boolean = false;
  public pageSize: number = 9;
  public pageIndex: number = 1;

  constructor(
    private readonly _requestService: RequestService,
    private readonly _requestSocketService: RequestSocketService,
    private readonly _constantService: ConstantService
  ) {
    this._requestSocketService.requestCreated$.subscribe(({ data }: SocketResponse<IRequest>) => {
      this.requests.unshift(data)
    })
  }
  ngOnDestroy(): void {
    this._requestSocketService.disconnect()
  }

  public get colorsConstants() {
    return this._constantService.colors
  }

  onQueryParamsChange(params: NzTableQueryParams) {
    const { pageIndex } = params;
    this.pageIndex = pageIndex;
    this._getAll();
  }

  private _getAll() {
    this.loading = true;
    return this._requestService
      .findAll({
        limit: this.pageSize,
        page: this.pageIndex,
        order: {
          number: OrderTypeEmum.DESC
        }
      })
      .subscribe(requests => {
        this.requests = requests.data;
        this.totalResults = requests.total;
        this.loading = false;
      });
  }
}
