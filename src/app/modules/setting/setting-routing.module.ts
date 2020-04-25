import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SettingComponent } from './setting.component';
import { GeneralSettingComponent } from './components/general-setting.component';

const routes: Routes = [
  {
    path: '',
    component: SettingComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'general' },
      { path: 'general', component: GeneralSettingComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingRoutingModule {}
