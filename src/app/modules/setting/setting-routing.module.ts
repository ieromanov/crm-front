import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StatusSettingComponent } from './components/setting/status-setting/status-setting.component';
import { ServiceTypeSettingComponent } from './components/setting/service-type-setting/service-type-setting.component';
import { TruckSettingComponent } from './components/setting/truck-setting/truck-setting.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'general' },
  { path: 'general', loadChildren: () => import('./components/general-setting/general-setting.module').then(m => m.GeneralSettingModule) },
  { path: 'status', component: StatusSettingComponent },
  { path: 'move-size', loadChildren: () => import('./components/move-size-setting/move-size-setting.module').then(m => m.MoveSizeSettingModule) },
  { path: 'service-type', component: ServiceTypeSettingComponent },
  { path: 'truck', component: TruckSettingComponent },
  { path: 'users', loadChildren: () => import('./components/department-setting/department-setting.module').then(m => m.DepartmentSettingModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingRoutingModule {}
