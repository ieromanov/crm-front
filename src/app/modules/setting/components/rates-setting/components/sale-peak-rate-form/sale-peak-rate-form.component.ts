import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd';

import { ISalePeakRate } from '@shared/interfaces/entity/sale-rates.interface';

import { SALE_PEAK_NAME_MAX_LENGTH } from './sale-peak-rate-form.constants';

@Component({
  selector: 'crm-sale-peak-rate-form',
  templateUrl: 'sale-peak-rate-form.component.html',
})
export class SalePeakRateFormComponent implements OnInit {
  @Input() public rate: ISalePeakRate = null;

  public form: FormGroup;

  constructor(
    private modalRef: NzModalRef,
    private readonly formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    const rate = this.init();

    this.form = this.formBuilder.group({
      name: [
        rate.name,
        [Validators.required, Validators.maxLength(SALE_PEAK_NAME_MAX_LENGTH)],
      ],
      color: [rate.color, [Validators.required]],
      twoMovers: [rate.twoMovers, [Validators.required]],
      threeMovers: [rate.threeMovers, [Validators.required]],
      fourMovers: [rate.fourMovers, [Validators.required]],
      additionalMover: [rate.additionalMover, [Validators.required]],
      additionalTruck: [rate.additionalTruck, [Validators.required]],
    });
  }

  init(): ISalePeakRate {
    return this.rate !== null
      ? this.rate
      : {
          name: '',
          color: '#000000',
          twoMovers: 100,
          threeMovers: 100,
          fourMovers: 100,
          additionalMover: 100,
          additionalTruck: 100,
        };
  }

  closeModal() {
    this.modalRef.destroy();
  }
}
