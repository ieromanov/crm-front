import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
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
import {
  PlusOutline,
  EditOutline,
  DeleteOutline,
} from '@ant-design/icons-angular/icons';

import { StatusServiceProvider } from '@core/provider/status-service.provider';
import { RoomServiceProvider } from '@core/provider/room-service.provider';
import { HomeServiceProvider } from '@core/provider/home-service.provider';
import { ServiceTypeServiceProvider } from '@core/provider/service-type-service.provider';
import { TruckServiceProvider } from '@core/provider/truck-service.provider';

import { GeneralSettingRoutingModule } from './setting-routing.module';
import { GeneralSettingComponent } from './components/general-setting/general-setting.component';
import { StatusSettingComponent } from './components/status-setting/status-setting.component';
import { StatusModalFormComponent } from './components/status-modal/status-modal-from.component';
import { RoomModalFormComponent } from './components/room-modal/room-modal-from.component';
import { HomeSettingComponent } from './components/home-setting/home-setting.component';
import { HomeModalFormComponent } from './components/home-modal/home-modal-from.component';
import { RoomSettingComponent } from './components/room-setting/room-setting.component';
import { ServiceTypeSettingComponent } from './components/service-type-setting/service-type-setting.component';
import { ServiceTypeModalFormComponent } from './components/service-type-modal/service-type-modal-from.component';
import { TruckSettingComponent } from './components/truck-setting/truck-setting.component';
import { TruckModalFormComponent } from './components/truck-modal/truck-modal-from.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    GeneralSettingRoutingModule,
    HttpClientModule,
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
    NzIconModule.forChild([EditOutline, DeleteOutline, PlusOutline]),
  ],
  declarations: [
    GeneralSettingComponent,
    StatusSettingComponent,
    StatusModalFormComponent,
    RoomSettingComponent,
    RoomModalFormComponent,
    HomeSettingComponent,
    HomeModalFormComponent,
    ServiceTypeSettingComponent,
    ServiceTypeModalFormComponent,
    TruckSettingComponent,
    TruckModalFormComponent
  ],
  providers: [
    StatusServiceProvider,
    RoomServiceProvider,
    HomeServiceProvider,
    ServiceTypeServiceProvider,
    TruckServiceProvider
  ],
})
export class SettingModule {}
