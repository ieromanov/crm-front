import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  NzTableModule,
  NzModalModule,
  NzNotificationModule,
  NzButtonModule,
  NzGridModule,
  NzFormModule,
  NzIconModule,
  NzInputModule,
  NzInputNumberModule,
  NzDividerModule,
} from 'ng-zorro-antd';

import { ConstantService } from '@core/services/constant.service';
import { SalePeakRatesService } from '@core/services/sale-peak-rates.service';

import { ColorPickerModule } from '@shared/components/color-picker/color-picker.module';

import { SalePeakRateFormComponent } from './components/sale-peak-rate-form/sale-peak-rate-form.component';
import { SalePeakRatesSettingRoutingModule } from './rates-setting-routing.module';
import { RatesSettingComponent } from './rates-setting.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SalePeakRatesSettingRoutingModule,

    NzTableModule,
    NzInputModule,
    NzInputNumberModule,
    NzFormModule,
    NzGridModule,
    NzModalModule,
    NzNotificationModule,
    NzButtonModule,
    NzDividerModule,
    NzIconModule,

    ColorPickerModule,
  ],
  exports: [RatesSettingComponent],
  declarations: [RatesSettingComponent, SalePeakRateFormComponent],
  providers: [SalePeakRatesService, ConstantService],
})
export class RatesSettingModule {}
