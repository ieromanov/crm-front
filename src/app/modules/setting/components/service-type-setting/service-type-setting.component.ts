import { Component, Inject, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd';
import { Observable } from 'rxjs';

import { SERVICE_TYPE_SERVICE } from '@core/di-tokens';
import { IServiceTypeService } from '@shared/interfaces/service/service-type-service.interface';
import { IServiceType } from '@shared/interfaces/entity/service-type.interface';

import { ServiceTypeFormComponent } from '../service-type-form/service-type-form.component';

@Component({
  selector: 'crm-service-type-setting',
  templateUrl: './service-type-setting.component.html',
  styleUrls: ['./service-type-setting.component.scss'],
})
export class ServiceTypeSettingComponent implements OnInit {
  public totalResults: number;
  public serviceTypes: IServiceType[] = [];
  public loading: boolean = false;
  public pageSize: number = 10;
  public pageIndex: number = 1;
  public allLoaded: boolean = false

  constructor(
    @Inject(SERVICE_TYPE_SERVICE)
    private readonly serviceTypeService: IServiceTypeService,
    private readonly modalService: NzModalService
  ) {}

  ngOnInit(): void {
    this._fetchServiceTypes()
  }

  public loadingMore() {
    this.pageIndex++;
    this._fetchServiceTypes();
  }

  public showDeleteConfirmModal(id: string) {
    this.modalService.confirm({
      nzTitle: 'Do you want to delete these service-type?',
      nzContent: 'When clicked the OK button, this service type will be deleted',
      nzOkType: 'danger',
      nzOnOk: this._handleOnConfirmDelete(id),
    });
  }

  public showCreateStatusModal() {
    this.modalService.create({
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

  public showUpdateStatusModal(serviceType: IServiceType) {
    this.modalService.create({
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
      this._create(componentInstance.form.value)
        .subscribe((serviceType: IServiceType) => {
            componentInstance.closeModal();
            this.serviceTypes.push(serviceType)
        });
    }
  }

  private _handleOnConfirmUpdate(id: string) {
    return (componentInstance: ServiceTypeFormComponent) => {
      if (componentInstance.form.valid) {
        const serviceType: IServiceType = componentInstance.form.value
        this._update(id, serviceType)
          .subscribe(() => {
            componentInstance.closeModal();
            const index = this.serviceTypes.findIndex(type => type.id === id)
            this.serviceTypes[index] = {
              ...this.serviceTypes[index],
              ...serviceType
            }
          });
      }
    }
  }

  private _handleOnConfirmDelete(id: string) {
    return async () => {
      try {
        await this._delete(id).toPromise();
        this.serviceTypes = this.serviceTypes.filter(type => type.id !== id)
      } catch(error) {
        console.error(error)
      }
    }
  }

  private _handleCloseModal(componentInstance: ServiceTypeFormComponent) {
    componentInstance.closeModal();
  }

  private _fetchServiceTypes() {
    this.loading = true;
    return this.serviceTypeService
      .findAll({
        limit: this.pageSize,
        page: this.pageIndex,
      })
      .subscribe((serviceTypes) => {
        this.serviceTypes = this.serviceTypes.concat(serviceTypes.data);
        if (serviceTypes.total === this.serviceTypes.length) {
          this.allLoaded = true
        }
        this.loading = false;
      });
  }

  private _delete(id: string) {
    return this.serviceTypeService.delete(id);
  }

  private _create(serviceType: IServiceType): Observable<IServiceType> {
    return this.serviceTypeService.create(serviceType);
  }

  private _update(id: string, serviceType: IServiceType): Observable<IServiceType> {
    return this.serviceTypeService.update(id, serviceType);
  }
}
