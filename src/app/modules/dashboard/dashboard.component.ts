import { Component, OnInit } from '@angular/core';
import { NzModalService, NzTableQueryParams } from 'ng-zorro-antd';

import { RequestService } from '@core/services/request.service';
import { ConstantService } from '@core/services/constant.service';

import { IRequest } from '@shared/interfaces/entity/request.inerface';
import { RequestFormComponent } from '@shared/components/forms/request-form/request-form.component';

@Component({
  selector: 'crm-dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.scss'],
})
export class DashboardComponent {
  public totalResults: number;
  public requests: IRequest[] = [];
  public loading: boolean = false;
  public pageSize: number = 9;
  public pageIndex: number = 1;

  constructor(
    private readonly _requestService: RequestService,
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
      nzTitle: 'Do you want to delete these request?',
      nzContent: 'When clicked the OK button, this request will be deleted',
      nzOkType: 'danger',
      nzOnOk: this._handleOnConfirmDelete(id),
    });
  }

  public showCreateModal() {
    this._modalService.create({
      nzTitle: 'Create room',
      nzContent: RequestFormComponent,
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

  public showUpdateModal(request: IRequest) {
    // this._modalService.create({
    //   nzTitle: 'Update request',
    //   nzContent: RequestFormComponent,
    //   nzComponentParams: { request },
    //   nzFooter: [
    //     {
    //       label: 'Cancel',
    //       onClick: this._handleCloseModal,
    //     },
    //     {
    //       label: 'Update',
    //       type: 'primary',
    //       onClick: this._handleOnConfirmUpdate(request.id),
    //     },
    //   ],
    // });
  }

  private _handleOnConfirmDelete(id: string) {
    return () => {
      // this._requestService.delete(id).subscribe(() => {
      //   this._getAll();
      // });
    }
  }

  private _handleOnConfirmCreate(componentInstance: RequestFormComponent) {
    // if (componentInstance.form.valid) {
    //   this._requestService.create(componentInstance.form.value)
    //     .subscribe(() => {
    //       componentInstance.closeModal();
    //       this._getAll();
    //     }, (error) => {
    //       console.log(error)
    //     });
    // }
  }

  private _handleCloseModal(componentInstance: RequestFormComponent) {
    // componentInstance.closeModal();
  }

  private _getAll() {
    this.loading = true;
    return this._requestService
      .findAll({
        limit: this.pageSize,
        page: this.pageIndex,
      })
      .subscribe(requests => {
        this.requests = requests.data;
        this.totalResults = requests.total;
        this.loading = false;
      });
  }
}
