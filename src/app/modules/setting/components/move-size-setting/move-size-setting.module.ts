import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  NzButtonModule,
  NzInputModule,
  NzInputNumberModule,
  NzFormModule,
  NzModalModule,
  NzSwitchModule,
  NzListModule,
  NzSelectModule,
  NzIconModule,
  NzDescriptionsModule,
  NzDividerModule,
  NzGridModule,
} from 'ng-zorro-antd';
import { DeleteOutline, EditOutline } from '@ant-design/icons-angular/icons';

import { RoomService } from '@core/services/room.service';
import { HomeTypeService } from '@core/services/home-type.service';
import { ConstantService } from '@core/services/constant.service';

import { HomeTypeFormComponent } from './components/home-type-form/home-type-form.component';
import { HomeTypeListComponent } from './components/home-type-list/home-type-list.component';
import { RoomTypeListComponent } from './components/room-type-list/room-type-list.component';
import { RoomTypeFormComponent } from './components/room-type-form/room-type-form.component';

import { MoveSizeSettingComponent } from './move-size-setting.component';
import { MoveSizeSettingRoutingModule } from './move-size-setting-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MoveSizeSettingRoutingModule,

    NzButtonModule,
    NzGridModule,
    NzInputModule,
    NzInputNumberModule,
    NzFormModule,
    NzModalModule,
    NzSwitchModule,
    NzListModule,
    NzSelectModule,
    NzDividerModule,
    NzDescriptionsModule,
    NzIconModule.forChild([EditOutline, DeleteOutline]),
  ],
  exports: [MoveSizeSettingComponent],
  declarations: [
    MoveSizeSettingComponent,
    HomeTypeFormComponent,
    HomeTypeListComponent,
    RoomTypeFormComponent,
    RoomTypeListComponent,
  ],
  providers: [ConstantService, RoomService, HomeTypeService],
})
export class MoveSizeSettingModule {}
