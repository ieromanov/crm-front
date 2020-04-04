import { NgModule } from '@angular/core';

import { MonitorRoutingModule } from './monitor-routing.module';

import { MonitorComponent } from './monitor.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [MonitorRoutingModule, HttpClientModule],
  declarations: [MonitorComponent],
  exports: [MonitorComponent]
})
export class MonitorModule {}
