import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { NzModalService } from 'ng-zorro-antd';
import { Observable } from 'rxjs';

import { StatusFormComponent } from '../status-form/status-form.component';
import { IStatus } from '@shared/interfaces/entity/status.interface';
import { StatusService } from '@core/services/status.service';

import { State } from '@store/index';
import { statusDictionaryEntitiesSelector } from '@store/dictionaries/dictionaries.selector';
import {
  updateOneStatusAction,
  removeOneStatusAction,
  addOneStatusAction,
} from '@store/dictionaries/status-dictionary/status-dictionary.action';

@Component({
  selector: 'crm-status-setting',
  templateUrl: './status-setting.component.html',
  styleUrls: ['./status-setting.component.scss'],
})
export class StatusSettingComponent {
  public loading: boolean = false;
  public statuses$: Observable<IStatus[]> = this._store.select(
    statusDictionaryEntitiesSelector
  );

  constructor(
    private readonly _statusService: StatusService,
    private readonly _modalService: NzModalService,
    private readonly _store: Store<State>
  ) {}

  public showDeleteConfirmModal(id: string) {
    this._modalService.confirm({
      nzTitle: 'Do you want to delete these service-type?',
      nzContent:
        'When clicked the OK button, this service type will be deleted',
      nzOkType: 'danger',
      nzOnOk: this._handleOnConfirmDelete(id),
    });
  }

  public showCreateStatusModal() {
    this._modalService.create({
      nzTitle: 'Create service type',
      nzContent: StatusFormComponent,
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
    this._modalService.create({
      nzTitle: 'Update service type',
      nzContent: StatusFormComponent,
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

  private _handleOnConfirmCreate(componentInstance: StatusFormComponent) {
    if (componentInstance.form.valid) {
      this.loading = true
      this._statusService.create(componentInstance.form.value).subscribe(
        (status: IStatus) => {
          componentInstance.closeModal();
          this._store.dispatch(addOneStatusAction(status));
          this.loading = false
        }
      );
    }
  }

  private _handleOnConfirmUpdate(id: string) {
    return (componentInstance: StatusFormComponent) => {
      if (componentInstance.form.valid) {
        this.loading = true
        const status: IStatus = componentInstance.form.value;
        this._statusService.update(id, status).subscribe(() => {
          componentInstance.closeModal();
          this._store.dispatch(updateOneStatusAction({ id, changes: status }));
          this.loading = false
        });
      }
    };
  }

  private _handleOnConfirmDelete(id: string) {
    return () => {
      this.loading = true
      this._statusService.delete(id).subscribe(() => {
        this._store.dispatch(removeOneStatusAction({ id }));
        this.loading = false
      });
    };
  }

  private _handleCloseModal(componentInstance: StatusFormComponent) {
    componentInstance.closeModal();
  }
}
