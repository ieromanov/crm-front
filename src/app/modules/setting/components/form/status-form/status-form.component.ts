import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd';
import { IStatus } from '@shared/interfaces/entity/status.interface';
import {
  STATUS_NAME_MAX_LENGTH,
  STATUS_DESCRIPTION_MAX_LENGTH,
} from './status-form.constants'

@Component({
  selector: 'crm-status-form',
  templateUrl: 'status-form.component.html',
})
export class StatusFormComponent implements OnInit {
  @Input() public status: IStatus = null;

  public form: FormGroup;

  constructor(
    private modalRef: NzModalRef,
    private readonly formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    const status = this.initStatus();

    this.form = this.formBuilder.group({
      name: [
        status.name,
        [Validators.required, Validators.maxLength(STATUS_NAME_MAX_LENGTH)],
      ],
      description: [
        status.description,
        [Validators.maxLength(STATUS_DESCRIPTION_MAX_LENGTH)],
      ],
      active: [status.active],
    });
  }

  initStatus(): IStatus {
    return this.status !== null
      ? this.status
      : {
          name: 'new status name',
          description: null,
          active: true,
        };
  }

  closeModal() {
    this.modalRef.destroy();
  }
}
