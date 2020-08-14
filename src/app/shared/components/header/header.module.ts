import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NzPageHeaderModule,
  NzDropDownModule,
  NzAvatarModule,
  NzButtonModule,
  NzIconModule,
} from 'ng-zorro-antd';

import { LogoutOutline } from '@ant-design/icons-angular/icons';

import { CreateRequestModalModule } from '@shared/components/modal/create-request-modal/create-request-modal.module';

import { HeaderComponent } from './header.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,

    NzPageHeaderModule,
    NzAvatarModule,
    NzButtonModule,
    NzIconModule.forChild([LogoutOutline]),

    CreateRequestModalModule,
  ],
  exports: [HeaderComponent],
  declarations: [HeaderComponent],
})
export class HeaderModule {}
