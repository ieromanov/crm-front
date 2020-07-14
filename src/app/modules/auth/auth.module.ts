import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzAlertModule } from 'ng-zorro-antd/alert';

import {
  EyeOutline,
  EyeInvisibleOutline
} from '@ant-design/icons-angular/icons';

import { UpdatePasswordFormComponent } from '@shared/components/forms/update-password-form/update-password-form.component';
import { LoginFormComponent } from './components/login-form/login-form.component';

import { AuthComponent } from './auth.component';
import { AuthRoutingModule } from './auth-routing.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AuthRoutingModule,

    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzAlertModule,
    NzIconModule.forChild([EyeOutline, EyeInvisibleOutline]),
  ],
  declarations: [AuthComponent, LoginFormComponent, UpdatePasswordFormComponent],
  bootstrap: [AuthComponent],
})
export class AuthModule {}
