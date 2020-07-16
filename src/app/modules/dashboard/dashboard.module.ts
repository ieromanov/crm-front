import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NzTableModule } from 'ng-zorro-antd/table';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzBadgeModule } from 'ng-zorro-antd/badge';

import { SocketIoModule } from 'ngx-socket-io';

import { ConstantService } from '@core/services/constant.service';
import { RequestService } from '@core/services/request.service';
import { RequestSocketService } from '@core/socket-services/request.socket-service';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,

    SocketIoModule,

    NzBadgeModule,
    NzTableModule,
    NzTagModule
  ],
  providers: [RequestService, ConstantService, RequestSocketService],
  declarations: [DashboardComponent],
  exports: [DashboardComponent],
})
export class DashboardModule {}
