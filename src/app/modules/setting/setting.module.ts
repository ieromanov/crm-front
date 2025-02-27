import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzSelectModule } from 'ng-zorro-antd/select';
import {
  PlusOutline,
  EditOutline,
  DeleteOutline,
} from '@ant-design/icons-angular/icons';

import { UserService } from '@core/services/user.service';

import { ConstantService } from '@core/services/constant.service';
import { TruckService } from '@core/services/truck.service';
import { RoomService } from '@core/services/room.service';
import { StatusService } from '@core/services/status.service';
import { HomeTypeService } from '@core/services/home-type.service';
import { ServiceTypeService } from '@core/services/service-type.service';

import { SettingRoutingModule } from './setting-routing.module';
import { StatusSettingComponent } from './components/setting/status-setting/status-setting.component';
import { ServiceTypeSettingComponent } from './components/setting/service-type-setting/service-type-setting.component';
import { TruckSettingComponent } from './components/setting/truck-setting/truck-setting.component';

import { StatusFormComponent } from './components/form/status-form/status-form.component';
import { ServiceTypeFormComponent } from './components/form/service-type-form/service-type-form.component';
import { TruckFormComponent } from './components/form/truck-form/truck-form.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SettingRoutingModule,

    NzButtonModule,
    NzInputModule,
    NzInputNumberModule,
    NzToolTipModule,
    NzSpinModule,
    NzFormModule,
    NzTableModule,
    NzDividerModule,
    NzModalModule,
    NzSwitchModule,
    NzListModule,
    NzSelectModule,
    NzIconModule.forChild([EditOutline, DeleteOutline, PlusOutline]),
  ],
  declarations: [
    StatusSettingComponent,
    StatusFormComponent,
    ServiceTypeSettingComponent,
    ServiceTypeFormComponent,
    TruckSettingComponent,
    TruckFormComponent,
  ],
  providers: [
    StatusService,
    RoomService,
    HomeTypeService,
    ServiceTypeService,
    UserService,
    ConstantService,
    TruckService,
    RoomService
  ],
})
export class SettingModule {}
