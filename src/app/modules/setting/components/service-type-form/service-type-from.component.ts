import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd';
import { IServiceType } from '@shared/interfaces/entity/service-type.interface';
import {
  SERVICE_TYPE_NAME_MAX_LENGTH,
  SERVICE_TYPE_DESCRIPTION_MAX_LENGTH,
} from './service-type-form.constants';

@Component({
  selector: 'crm-service-type-from',
  templateUrl: 'service-type-form.component.html',
})
export class ServiceTypeFormComponent implements OnInit {
  @Input() public serviceType: IServiceType = null;

  public form: FormGroup;

  constructor(
    private modalRef: NzModalRef,
    private readonly formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    const serviceType = this.initStatus();

    this.form = this.formBuilder.group({
      name: [
        serviceType.name,
        [Validators.required, Validators.maxLength(SERVICE_TYPE_NAME_MAX_LENGTH)],
      ],
      description: [
        serviceType.description,
        [Validators.maxLength(SERVICE_TYPE_DESCRIPTION_MAX_LENGTH)],
      ],
      active: [serviceType.active],
    });
  }

  initStatus(): IServiceType {
    return this.serviceType !== null
      ? this.serviceType
      : {
          name: 'new service type name',
          description: null,
          active: true,
        };
  }

  closeModal() {
    this.modalRef.destroy();
  }
}
