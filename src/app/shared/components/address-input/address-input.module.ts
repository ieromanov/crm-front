import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzSelectModule, NzInputModule, NzCheckboxModule } from 'ng-zorro-antd';

import { AddressInputComponent } from './address-input.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    NzSelectModule,
    NzInputModule,
    NzCheckboxModule,
  ],
  exports: [AddressInputComponent],
  declarations: [AddressInputComponent],
})
export class AddressInputModule {}
