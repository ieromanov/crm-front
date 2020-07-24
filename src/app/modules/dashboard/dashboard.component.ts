import { Router } from '@angular/router';
import { Component, OnDestroy } from '@angular/core';
import { NzTableQueryParams } from 'ng-zorro-antd';
import { Subscription } from 'rxjs';

import { RequestService } from '@core/services/request.service';
import { ConstantService } from '@core/services/constant.service';
import { RequestSocketService } from '@core/socket-services/request.socket-service';

import { IRequest } from '@shared/interfaces/entity/request.interface';
import { OrderTypeEmum } from '@shared/enum/order-type.enum';

@Component({
  selector: 'crm-dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.scss'],
})
export class DashboardComponent implements OnDestroy {
  public totalResults: number;
  public requests: IRequest[] = [];
  public loading: boolean = false;
  public pageSize: number = 10;
  public pageIndex: number = 1;

  private _requestCreatedSub: Subscription;

  constructor(
	private readonly _router: Router,
    private readonly _requestService: RequestService,
    private readonly _requestSocketService: RequestSocketService,
    private readonly _constantService: ConstantService
  ) {
    this._requestCreatedSub = this._requestSocketService.requestCreated$.subscribe(
      this._getAll.bind(this)
    );
  }
  ngOnDestroy(): void {
    this._requestCreatedSub.unsubscribe();
    this._requestSocketService.disconnect();
  }

  public get colorsConstants() {
    return this._constantService.colors;
  }

  public onQueryParamsChange(params: NzTableQueryParams) {
    const { pageIndex } = params;
    this.pageIndex = pageIndex;
    this._getAll();
  }

  public goToRequest(id: string) {
	this._router.navigate(['/request/' + id])
  }

  private _getAll() {
    this.loading = true;
    return this._requestService
      .findAll({
        limit: this.pageSize,
        page: this.pageIndex,
        order: {
          number: OrderTypeEmum.DESC,
        },
      })
      .subscribe((requests) => {
        this.requests = requests.data;
        this.totalResults = requests.total;
        this.loading = false;
      });
  }
}
