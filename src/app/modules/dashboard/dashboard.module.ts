import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NzTableModule } from 'ng-zorro-antd/table';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzTagModule } from 'ng-zorro-antd/tag';

import { ConstantService } from '@core/services/constant.service';
import { RequestService } from '@core/services/request.service';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,

    NzTableModule,
    NzModalModule,
    NzTagModule
  ],
  providers: [RequestService, ConstantService],
  declarations: [DashboardComponent],
  exports: [DashboardComponent],
})
export class DashboardModule {}
