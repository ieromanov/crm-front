import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NzPageHeaderModule,
  NzDropDownModule,
  NzAvatarModule,
  NzButtonModule
} from 'ng-zorro-antd';

import { CreateRequestModalModule } from '@shared/components/modal/create-request-modal/create-request-modal.module';

import { HeaderComponent } from './header.component';

@NgModule({
  imports: [
    CommonModule,
    NzPageHeaderModule,
    NzDropDownModule,
    NzAvatarModule,
    NzButtonModule,

    CreateRequestModalModule,
  ],
  exports: [HeaderComponent],
  declarations: [HeaderComponent],
})
export class HeaderModule {}
