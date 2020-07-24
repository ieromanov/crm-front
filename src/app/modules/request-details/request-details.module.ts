import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  NzTagModule,
  NzGridModule,
  NzButtonModule,
  NzStatisticModule,
  NzPageHeaderModule,
  NzSpinModule,
} from 'ng-zorro-antd';

import { RequestService } from '@core/services/request.service';

import { SecondsToTimePipe } from '@shared/pipe/second-to-time.pipe';

import { RequestDetailsComponent } from './request-details.component';
import { DashboardRoutingModule } from './request-details-routing.module';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,

	NzSpinModule,
    NzTagModule,
    NzGridModule,
    NzButtonModule,
    NzPageHeaderModule,
    NzStatisticModule,
  ],
  declarations: [RequestDetailsComponent, SecondsToTimePipe],
  providers: [RequestService],
})
export class RequestDetailsModule {}
