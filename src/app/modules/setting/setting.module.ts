import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzIconModule } from 'ng-zorro-antd/icon';
import {
  PlusOutline,
  EditOutline,
  DeleteOutline
} from '@ant-design/icons-angular/icons';

import { StatusServiceProvider } from '@core/provides/status-service.provider';

import { GeneralSettingRoutingModule } from './setting-routing.module';
import { GeneralSettingComponent } from './components/general-setting/general-setting.component';
import { StatusSettingComponent } from './components/status-setting/status-setting.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    GeneralSettingRoutingModule,
    HttpClientModule,
    NzButtonModule,
    NzInputModule,
    NzToolTipModule,
    NzSpinModule,
    NzFormModule,
    NzTableModule,
    NzDividerModule,
    NzModalModule,
    NzSpaceModule,
    NzIconModule.forChild([
      EditOutline,
      DeleteOutline,
      PlusOutline
    ])
  ],
  declarations: [GeneralSettingComponent, StatusSettingComponent],
  providers: [StatusServiceProvider]
})
export class SettingModule {}
