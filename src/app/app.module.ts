import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import en from '@angular/common/locales/en';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { IconsProviderModule } from './icons-provider.module';
import {
  NgZorroAntdModule,
  NzButtonModule,
  NZ_I18N,
  en_US,
} from 'ng-zorro-antd';
import { CoreModule } from '@core/core.module';

registerLocaleData(en);
@NgModule({
  declarations: [AppComponent],
  imports: [
    CoreModule,
    BrowserModule,
    AppRoutingModule,
    IconsProviderModule,
    NgZorroAntdModule,
    FormsModule,
    BrowserAnimationsModule,
    NzButtonModule,
    HttpClientModule,
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
