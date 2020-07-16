import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeTypeSettingComponent } from './home-type-setting.component';

const routes: Routes = [{ path: '', component: HomeTypeSettingComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeTypeSettingRoutingModule {}
