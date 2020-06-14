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
import { NzSelectModule } from 'ng-zorro-antd/select';
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
import { ConstantServiceProvider } from '@core/provider/constant-service.provider';

import { GeneralSettingRoutingModule } from './setting-routing.module';
import { GeneralSettingComponent } from './components/general-setting/general-setting.component';
import { StatusSettingComponent } from './components/status-setting/status-setting.component';
import { StatusFormComponent } from './components/status-form/status-form.component';
import { RoomFormComponent } from './components/room-form/room-form.component';
import { HomeSettingComponent } from './components/home-setting/home-setting.component';
import { HomeFormComponent } from './components/home-form/home-form.component';
import { RoomSettingComponent } from './components/room-setting/room-setting.component';
import { ServiceTypeSettingComponent } from './components/service-type-setting/service-type-setting.component';
import { ServiceTypeFormComponent } from './components/service-type-form/service-type-form.component';
import { TruckSettingComponent } from './components/truck-setting/truck-setting.component';
import { TruckFormComponent } from './components/truck-form/truck-form.component';

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
    NzSelectModule,
    NzIconModule.forChild([EditOutline, DeleteOutline, PlusOutline]),
  ],
  declarations: [
    GeneralSettingComponent,
    StatusSettingComponent,
    StatusFormComponent,
    RoomSettingComponent,
    RoomFormComponent,
    HomeSettingComponent,
    HomeFormComponent,
    ServiceTypeSettingComponent,
    ServiceTypeFormComponent,
    TruckSettingComponent,
    TruckFormComponent
  ],
  providers: [
    StatusServiceProvider,
    RoomServiceProvider,
    HomeServiceProvider,
    ServiceTypeServiceProvider,
    TruckServiceProvider,
    ConstantServiceProvider
  ],
})
export class SettingModule {}
