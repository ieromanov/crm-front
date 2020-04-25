import { NgModule } from '@angular/core';

import { SettingRoutingModule } from './setting-routing.module';

import { SettingComponent } from './setting.component';
import { ApiService } from '@core/services/api.service';
import { API_SERVICE } from '@core/di-tokens';
import { NzFormModule } from 'ng-zorro-antd/form';
import { CommonModule } from '@angular/common';
import { GeneralSettingComponent } from './components/general-setting.component';

@NgModule({
  imports: [
    CommonModule,
    SettingRoutingModule,
    NzFormModule,
  ],
  providers: [{
    provide: API_SERVICE,
    useClass: ApiService
  }],
  declarations: [
    SettingComponent,
    GeneralSettingComponent
  ],
  exports: [SettingComponent]
})
export class SettingModule {}
