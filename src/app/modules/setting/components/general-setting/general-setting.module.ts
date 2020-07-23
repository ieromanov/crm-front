import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  NzFormModule,
  NzInputModule,
  NzButtonModule,
  NzGridModule,
  NzDividerModule,
  NzIconModule,
  NzSpinModule,
} from 'ng-zorro-antd';
import { CheckOutline, StopOutline } from '@ant-design/icons-angular/icons';

import { SettingService } from '@core/services/setting.service';

import { SettingFormComponent } from './components/setting-form/setting-form.component';

import { GeneralSettingComponent } from './general-setting.component';
import { GeneralSettingRoutingModule } from './general-setting-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    GeneralSettingRoutingModule,

	NzDividerModule,
	NzSpinModule,
    NzFormModule,
    NzGridModule,
    NzInputModule,
    NzButtonModule,
    NzIconModule.forChild([CheckOutline, StopOutline]),
  ],
  declarations: [GeneralSettingComponent, SettingFormComponent],
  providers: [SettingService],
})
export class GeneralSettingModule {}
