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
  NzDropDownModule,
} from 'ng-zorro-antd';

import { ConstantService } from '@core/services/constant.service';
import { UserService } from '@core/services/user.service';

import { UserFormComponent } from './components/user-form/user-form.component';

import { DepartmentSettingComponent } from './department-setting.component';
import { DepartmentSettingRoutingModule } from './department-setting-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DepartmentSettingRoutingModule,

    NzTableModule,
    NzInputModule,
    NzFormModule,
    NzGridModule,
    NzModalModule,
    NzNotificationModule,
    NzButtonModule,
    NzDropDownModule,
    NzIconModule,
  ],
  exports: [DepartmentSettingComponent],
  declarations: [DepartmentSettingComponent, UserFormComponent],
  providers: [UserService, ConstantService],
})
export class DepartmentSettingModule {}
