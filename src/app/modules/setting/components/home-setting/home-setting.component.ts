import { Observable } from 'rxjs';
import { Component, Inject } from '@angular/core';
import { NzTableQueryParams, NzModalService } from 'ng-zorro-antd';

import { HOME_SERVICE, CONSTANT_SERVICE } from '@core/di-tokens';
import { IHomeTypeService } from '@shared/interfaces/service/home-service.interface';
import { IConstantService } from '@shared/interfaces/service/constant-service.interface';
import { IHomeType } from '@shared/interfaces/entity/home.interface';

import { HomeFormComponent } from '../home-form/home-form.component';
import { IRoom } from '@shared/interfaces/entity/room.interface';

@Component({
  selector: 'crm-home-setting',
  templateUrl: './home-setting.component.html',
  styleUrls: ['./home-setting.component.scss'],
})
export class HomeSettingComponent {
  public totalResults: number;
  public houses: IHomeType[] = [];
  public loading: boolean = false;
  public pageSize: number = 9;
  public pageIndex: number = 1;

  constructor(
    @Inject(HOME_SERVICE)
    private readonly _homeTypeService: IHomeTypeService,
    @Inject(CONSTANT_SERVICE)
    private readonly _constantService: IConstantService,
    private readonly modalService: NzModalService
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
      nzContent: HomeFormComponent,
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

  public showUpdateHomeModal(home: IHomeType) {
    this.modalService.create({
      nzTitle: 'Update home',
      nzContent: HomeFormComponent,
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

  private _handleOnConfirmCreate(componentInstance: HomeFormComponent) {
    if (componentInstance.form.valid) {
      const data = {
        ...componentInstance.form.value,
        rooms: componentInstance.rooms.filter(
          ({ id }: IRoom) => componentInstance.form.value.rooms.includes(id)
        )
      }
      this._create(data)
        .subscribe(() => {
          componentInstance.closeModal();
          this._getAll();
        });
    }
  }

  private _handleOnConfirmUpdate(id: string) {
    return (componentInstance: HomeFormComponent) => {
      if (componentInstance.form.valid) {
        const data = {
          ...componentInstance.form.value,
          rooms: componentInstance.rooms.filter(
            ({ id }: IRoom) => componentInstance.form.value.rooms.includes(id)
          )
        }
        this._update(id, data)
          .subscribe(() => {
            componentInstance.closeModal();
            this._getAll();
          });
      }
    }
  }

  private _handleCloseModal(componentInstance: HomeFormComponent) {
    componentInstance.closeModal();
  }

  private _getAll() {
    this.loading = true;
    return this._homeTypeService
      .findAll({
        limit: this.pageSize,
        page: this.pageIndex,
      })
      .subscribe(houses => {
        this.houses = houses.data;
        this.totalResults = houses.total;
        this.loading = false;
      });
  }

  private _delete(id: string) {
    return this._homeTypeService.delete(id);
  }

  private _create(home: IHomeType): Observable<IHomeType> {
    return this._homeTypeService.create(home);
  }

  private _update(id: string, home: IHomeType): Observable<IHomeType> {
    return this._homeTypeService.update(id, home);
  }
}
