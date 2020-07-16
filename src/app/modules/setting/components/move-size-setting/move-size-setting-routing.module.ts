import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MoveSizeSettingComponent } from './move-size-setting.component';

const routes: Routes = [{ path: '', component: MoveSizeSettingComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MoveSizeSettingRoutingModule {}
