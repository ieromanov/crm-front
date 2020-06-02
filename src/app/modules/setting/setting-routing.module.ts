import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GeneralSettingComponent } from './components/general-setting/general-setting.component';
import { StatusSettingComponent } from './components/status-setting/status-setting.component';
import { HomeSettingComponent } from './components/home-setting/home-setting.component';
import { RoomSettingComponent } from './components/room-setting/room-setting.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/general' },
  { path: 'general', component: GeneralSettingComponent },
  { path: 'status', component: StatusSettingComponent },
  { path: 'room', component: RoomSettingComponent },
  { path: 'home', component: HomeSettingComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GeneralSettingRoutingModule {}
