import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NzDescriptionsModule } from 'ng-zorro-antd';

import { UserService } from '@core/services/user.service';

import { UserInfoComponent } from './components/user-info/user-info.component';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';

@NgModule({
  imports: [CommonModule, ProfileRoutingModule, NzDescriptionsModule],
  declarations: [ProfileComponent, UserInfoComponent],
  providers: [UserService],
})
export class ProfileModule {}
