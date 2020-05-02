import { NgModule } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import en from '@angular/common/locales/en';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {
  NzButtonModule,
  NzLayoutModule,
  NZ_I18N,
  en_US,
  NzMenuModule,
  NzIconModule,
  NzPageHeaderModule
} from 'ng-zorro-antd';
import { CoreModule } from '@core/core.module';

import { HeaderComponent } from '@shared/components/header/header.component';

import {
  MenuFoldOutline,
  MenuUnfoldOutline,
  FormOutline,
  DashboardOutline,
  SettingOutline,
  EditOutline,
  DeleteOutline
} from '@ant-design/icons-angular/icons';

registerLocaleData(en);
@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [
    CoreModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NzButtonModule,
    NzMenuModule,
    NzLayoutModule,
    NzPageHeaderModule,
    NzIconModule.forRoot([
      MenuFoldOutline,
      MenuUnfoldOutline,
      DashboardOutline,
      FormOutline,
      SettingOutline,
      EditOutline,
      DeleteOutline
    ])
  ],
  providers: [
    {
      provide: NZ_I18N,
      useValue: en_US,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
