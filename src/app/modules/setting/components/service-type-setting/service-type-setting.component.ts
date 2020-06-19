import { Component } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { IServiceType } from '@shared/interfaces/entity/service-type.interface';

import { ServiceTypeFormComponent } from '../service-type-form/service-type-form.component';
import { ServiceTypeService } from '@core/services/service-type.service';

import { State } from '@core/store';
import {
  updateOneAction,
  removeOneAction,
  addOneAction,
} from '@store/dictionaries/service-type-dictionary/service-type-dictionary.action';
import { serviceTypesDictionaryEntitiesSelector } from '@store/dictionaries/dictionaries.selector';

@Component({
  selector: 'crm-service-type-setting',
  templateUrl: './service-type-setting.component.html',
  styleUrls: ['./service-type-setting.component.scss'],
})
export class ServiceTypeSettingComponent {
  public loading: boolean = false;
  public serviceTypes$: Observable<IServiceType[]> = this._store.select(
    serviceTypesDictionaryEntitiesSelector
  );

  constructor(
    private readonly _serviceTypeService: ServiceTypeService,
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

  public showCreateModal() {
    this._modalService.create({
      nzTitle: 'Create service type',
      nzContent: ServiceTypeFormComponent,
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

  public showUpdateModal(serviceType: IServiceType) {
    this._modalService.create({
      nzTitle: 'Update service type',
      nzContent: ServiceTypeFormComponent,
      nzComponentParams: { serviceType },
      nzFooter: [
        {
          label: 'Cancel',
          onClick: this._handleCloseModal,
        },
        {
          label: 'Update',
          type: 'primary',
          onClick: this._handleOnConfirmUpdate(serviceType.id),
        },
      ],
    });
  }

  private _handleOnConfirmCreate(componentInstance: ServiceTypeFormComponent) {
    if (componentInstance.form.valid) {
      this.loading = true
      this._serviceTypeService.create(componentInstance.form.value).subscribe(
        (serviceType: IServiceType) => {
          componentInstance.closeModal();
          this._store.dispatch(addOneAction(serviceType));
          this.loading = false
        }
      );
    }
  }

  private _handleOnConfirmUpdate(id: string) {
    return (componentInstance: ServiceTypeFormComponent) => {
      if (componentInstance.form.valid) {
        this.loading = true
        const serviceType: IServiceType = componentInstance.form.value;
        this._serviceTypeService.update(id, serviceType).subscribe(() => {
          componentInstance.closeModal();
          this._store.dispatch(updateOneAction({ id, changes: serviceType }));
          this.loading = false
        });
      }
    };
  }

  private _handleOnConfirmDelete(id: string) {
    return () => {
      this.loading = true
      this._serviceTypeService.delete(id).subscribe(() => {
        this._store.dispatch(removeOneAction({ id }));
        this.loading = false
      });
    };
  }

  private _handleCloseModal(componentInstance: ServiceTypeFormComponent) {
    componentInstance.closeModal();
  }
}
