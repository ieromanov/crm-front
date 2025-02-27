import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GeneralSettingComponent } from './general-setting.component';

const routes: Routes = [{ path: '', component: GeneralSettingComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GeneralSettingRoutingModule {}
