import { NgModule } from '@angular/core';

import { MonitorRoutingModule } from './monitor-routing.module';

import { MonitorComponent } from './monitor.component';

@NgModule({
  imports: [MonitorRoutingModule],
  declarations: [MonitorComponent],
  exports: [MonitorComponent]
})
export class MonitorModule {}
