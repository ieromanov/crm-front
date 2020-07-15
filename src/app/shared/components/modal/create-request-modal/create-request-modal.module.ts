import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  NzFormModule,
  NzDatePickerModule,
  NzInputModule,
  NzGridModule,
  NzSelectModule,
  NzDividerModule,
  NzModalModule,
  NzButtonModule,
} from 'ng-zorro-antd';

import { RequestService } from '@core/services/request.service';

import { AddressInputModule } from '@shared/components/address-input/address-input.module';

import { CreateRequestModalComponent } from './create-request-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    NzFormModule,
    NzDatePickerModule,
    NzInputModule,
    NzGridModule,
    NzSelectModule,
    NzDividerModule,
    NzModalModule,
    NzButtonModule,

    AddressInputModule,
  ],
  exports: [CreateRequestModalComponent],
  declarations: [CreateRequestModalComponent],
  providers: [RequestService],
})
export class CreateRequestModalModule {}
