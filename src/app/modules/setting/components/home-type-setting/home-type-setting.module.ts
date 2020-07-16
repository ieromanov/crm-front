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
  NzCardModule,
  NzDescriptionsModule,
} from 'ng-zorro-antd';

import { DeleteOutline, EditOutline } from '@ant-design/icons-angular/icons';

import { ConstantService } from '@core/services/constant.service';

import { HomeTypeFormComponent } from './components/home-type-form/home-type-form.component';
import { HomeTypeCardComponent } from './components/home-type-card/home-type-card.component';
import { HomeTypeSettingRoutingModule } from './home-type-setting-routing.module';
import { HomeTypeSettingComponent } from './home-type-setting.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HomeTypeSettingRoutingModule,

    NzCardModule,
    NzButtonModule,
    NzInputModule,
    NzInputNumberModule,
    NzFormModule,
    NzModalModule,
    NzSwitchModule,
    NzListModule,
    NzSelectModule,
    NzDescriptionsModule,
    NzIconModule.forChild([EditOutline, DeleteOutline]),
  ],
  exports: [HomeTypeSettingComponent],
  declarations: [
    HomeTypeSettingComponent,
    HomeTypeFormComponent,
    HomeTypeCardComponent,
  ],
  providers: [ConstantService],
})
export class HomeTypeSettingModule {}
