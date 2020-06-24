import { NgModule } from '@angular/core';

import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';

import {
  EyeOutline,
  EyeInvisibleOutline
} from '@ant-design/icons-angular/icons';

import { AuthComponent } from './auth.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.component';


@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    AuthRoutingModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzIconModule.forChild([EyeOutline, EyeInvisibleOutline]),
  ],
  exports: [],
  declarations: [AuthComponent, LoginFormComponent],
  providers: [],
})
export class AuthModule {}
