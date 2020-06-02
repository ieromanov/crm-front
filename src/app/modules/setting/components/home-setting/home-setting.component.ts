import { Observable } from 'rxjs';
import { Component, Inject } from '@angular/core';
import { NzTableQueryParams, NzModalService } from 'ng-zorro-antd';

import { HOME_SERVICE } from '@core/di-tokens';
import { IHomeService } from '@shared/interfaces/service/home-service.interface';
import { IHome } from '@shared/interfaces/entity/home.interface';

import { HomeModalFormComponent } from '../home-modal/home-modal-from.component';

@Component({
  selector: 'crm-home-setting',
  templateUrl: './home-setting.component.html',
  styleUrls: ['./home-setting.component.scss'],
})
export class HomeSettingComponent {
  public totalResults: number;
  public houses: IHome[] = [];
  public loading: boolean = false;
  public pageSize: number = 9;
  public pageIndex: number = 1;

  public createHomeModalVisible: boolean = false;
  public createHomeModalLoading: boolean = false;

  constructor(
    @Inject(HOME_SERVICE)
    private readonly _homeService: IHomeService,
    private readonly modalService: NzModalService
  ) {}

  onQueryParamsChange(params: NzTableQueryParams) {
    const { pageIndex } = params;
    this.pageIndex = pageIndex;
    this._getAll();
  }

  public showDeleteConfirmModal(id: string) {
    this.modalService.confirm({
      nzTitle: 'Do you want to delete these home?',
      nzContent: 'When clicked the OK button, this home will be deleted',
      nzOkType: 'danger',
      nzOnOk: this._handleOnConfirmDelete(id),
    });
  }

  public showCreateHomeModal() {
    this.modalService.create({
      nzTitle: 'Create home',
      nzContent: HomeModalFormComponent,
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

  public showUpdateHomeModal(home: IHome) {
    this.modalService.create({
      nzTitle: 'Update home',
      nzContent: HomeModalFormComponent,
      nzComponentParams: { home },
      nzFooter: [
        {
          label: 'Cancel',
          onClick: this._handleCloseModal,
        },
        {
          label: 'Update',
          type: 'primary',
          onClick: this._handleOnConfirmUpdate(home.id),
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

  private _handleOnConfirmCreate(componentInstance: HomeModalFormComponent) {
    if (componentInstance.form.valid) {
      this._create(componentInstance.form.value)
        .subscribe(() => {
          componentInstance.closeModal();
          this._getAll();
        });
    }
  }

  private _handleOnConfirmUpdate(id: string) {
    return (componentInstance: HomeModalFormComponent) => {
      if (componentInstance.form.value) {
        this._update(id, componentInstance.form.value)
          .subscribe(() => {
            componentInstance.closeModal();
            this._getAll();
          });
      }
    }
  }

  private _handleCloseModal(componentInstance: HomeModalFormComponent) {
    componentInstance.closeModal();
  }

  private _getAll() {
    this.loading = true;
    return this._homeService
      .findAll({
        take: this.pageSize,
        skip: (this.pageIndex - 1) * this.pageSize,
      })
      .subscribe(houses => {
        this.houses = houses.items;
        this.totalResults = houses.total;
        this.loading = false;
      });
  }

  private _delete(id: string) {
    return this._homeService.delete(id);
  }

  private _create(home: IHome): Observable<IHome> {
    return this._homeService.create(home);
  }

  private _update(id: string, home: IHome): Observable<IHome> {
    return this._homeService.update(id, home);
  }
}
