import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RatesSettingComponent } from './rates-setting.component';

const routes: Routes = [{ path: '', component: RatesSettingComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalePeakRatesSettingRoutingModule {}
