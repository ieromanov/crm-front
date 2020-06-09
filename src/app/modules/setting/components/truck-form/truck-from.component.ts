import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd';
import { ITruck } from '@shared/interfaces/entity/truck.interface';
import {
  TRUCK_NAME_MAX_LENGTH,
  TRUCK_DESCRIPTION_MAX_LENGTH,
} from './truck-form.constants'

@Component({
  selector: 'crm-truck-form',
  templateUrl: 'truck-form.component.html',
})
export class TruckFormComponent implements OnInit {
  @Input() public truck: ITruck = null;

  public form: FormGroup;

  constructor(
    private modalRef: NzModalRef,
    private readonly formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    const truck = this.initTruck();

    this.form = this.formBuilder.group({
      name: [
        truck.name,
        [Validators.required, Validators.maxLength(TRUCK_NAME_MAX_LENGTH)],
      ],
      description: [
        truck.description,
        [Validators.maxLength(TRUCK_DESCRIPTION_MAX_LENGTH)],
      ],
      volume: [
        truck.volume,
        [Validators.required],
      ],
      active: [truck.active],
    });
  }

  initTruck(): ITruck {
    return this.truck !== null
      ? this.truck
      : {
          name: 'new truck name',
          description: null,
          volume: 0,
          active: true,
        };
  }

  closeModal() {
    this.modalRef.destroy();
  }
}
