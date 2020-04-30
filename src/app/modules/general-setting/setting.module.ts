import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzButtonModule } from 'ng-zorro-antd';

import { GeneralSettingRoutingModule } from './setting-routing.module';
import { GeneralSettingComponent } from './components/general-setting/general-setting.component';

@NgModule({
  imports: [
    CommonModule,
    GeneralSettingRoutingModule,
    HttpClientModule,
    NzButtonModule,
    NzInputModule,
    NzToolTipModule,
    NzSpinModule,
    NzFormModule,
  ],
  declarations: [GeneralSettingComponent],
  exports: [],
})
export class GeneralSettingModule {}
