import { Component } from '@angular/core';
import {
  NzModalService,
  NzTableQueryParams,
  NzNotificationService,
} from 'ng-zorro-antd';

import { ConstantService } from '@core/services/constant.service';
import { UserService } from '@core/services/user.service';

import { UserInfo } from '@shared/types/user-info.type';

import { UserFormComponent } from './components/user-form/user-form.component';

@Component({
  selector: 'crm-department-setting',
  templateUrl: 'department-setting.component.html',
})
export class DepartmentSettingComponent {
  public totalResults: number;
  public users: UserInfo[] = [];
  public loading: boolean = false;
  public pageSize: number = 9;
  public pageIndex: number = 1;

  constructor(
    private readonly _userService: UserService,
    private readonly _constantService: ConstantService,
    private readonly _modalService: NzModalService,
    private readonly _notificationService: NzNotificationService
  ) {}

  public get colorsConstants() {
    return this._constantService.colors;
  }

  onQueryParamsChange(params: NzTableQueryParams) {
    const { pageIndex } = params;
    this.pageIndex = pageIndex;
    this._getAll();
  }

  public showDeleteConfirmModal(id: string) {
    this._modalService.confirm({
      nzTitle: 'Do you want to delete these user?',
      nzContent: 'When clicked the OK button, this user will be deleted',
      nzOkType: 'danger',
      nzOnOk: this._handleOnConfirmDelete(id),
    });
  }

  public showCreateModal() {
    this._modalService.create({
      nzTitle: 'Create room',
      nzContent: UserFormComponent,
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

  public showUpdateModal(user: UserInfo) {
    this._modalService.create({
      nzTitle: 'Update user',
      nzContent: UserFormComponent,
      nzComponentParams: { user },
      nzFooter: [
        {
          label: 'Cancel',
          onClick: this._handleCloseModal,
        },
        {
          label: 'Update',
          type: 'primary',
          onClick: this._handleOnConfirmUpdate(user.id),
        },
      ],
    });
  }

  private _handleOnConfirmDelete(id: string) {
    return () => {
      this._userService
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

  private _handleOnConfirmCreate(componentInstance: UserFormComponent) {
    if (componentInstance.form.valid) {
      this._userService.create(componentInstance.form.value).subscribe(
        () => {
          componentInstance.closeModal();
          this._getAll();
        },
        (error) => {
          this._notificationService.create(
            'error',
            'User not created',
            error.detail
          );
        }
      );
    }
  }

  private _handleOnConfirmUpdate(id: string) {
    return (componentInstance: UserFormComponent) => {
      if (componentInstance.form.value) {
        // this._update(id, componentInstance.form.value)
        //   .subscribe(() => {
        //     componentInstance.closeModal();
        //     this._getAll();
        //   });
      }
    };
  }

  private _handleCloseModal(componentInstance: UserFormComponent) {
    componentInstance.closeModal();
  }

  private _getAll() {
    this.loading = true;
    return this._userService
      .findAll({
        limit: this.pageSize,
        page: this.pageIndex,
      })
      .subscribe((users) => {
        this.users = users.data;
        this.totalResults = users.total;
        this.loading = false;
      });
  }
}
