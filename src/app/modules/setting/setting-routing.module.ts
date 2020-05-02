import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GeneralSettingComponent } from './components/general-setting/general-setting.component';
import { StatusSettingComponent } from './components/request-status-setting/request-status-setting.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/general' },
  { path: 'general', component: GeneralSettingComponent },
  { path: 'status', component: StatusSettingComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GeneralSettingRoutingModule {}
