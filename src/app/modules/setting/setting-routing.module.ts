import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GeneralSettingComponent } from './components/setting/general-setting/general-setting.component';
import { StatusSettingComponent } from './components/setting/status-setting/status-setting.component';
import { HomeSettingComponent } from './components/setting/home-setting/home-setting.component';
import { RoomSettingComponent } from './components/setting/room-setting/room-setting.component';
import { ServiceTypeSettingComponent } from './components/setting/service-type-setting/service-type-setting.component';
import { TruckSettingComponent } from './components/setting/truck-setting/truck-setting.component';
import { UserSettingComponent } from './components/setting/user-setting/user-setting.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'general' },
  { path: 'general', component: GeneralSettingComponent },
  { path: 'status', component: StatusSettingComponent },
  { path: 'room', component: RoomSettingComponent },
  { path: 'home', component: HomeSettingComponent },
  { path: 'service-type', component: ServiceTypeSettingComponent },
  { path: 'truck', component: TruckSettingComponent },
  { path: 'users', component: UserSettingComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GeneralSettingRoutingModule {}
