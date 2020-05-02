import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GeneralSettingComponent } from './components/general-setting/general-setting.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/general' },
  { path: 'general', component: GeneralSettingComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GeneralSettingRoutingModule {}
