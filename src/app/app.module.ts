import { NgModule } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import en from '@angular/common/locales/en';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import {
  NZ_I18N,
  en_US
} from 'ng-zorro-antd';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import {
  MenuFoldOutline,
  MenuUnfoldOutline,
  DashboardOutline,
  SettingOutline,
} from '@ant-design/icons-angular/icons';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { CoreModule } from '@core/core.module';

import { reducers } from '@store/index';
import { UserEffects } from '@store/user/user.effect';
import { HeaderComponent } from '@shared/components/header/header.component';
import { LayoutComponent } from '@shared/components/layout/layout.component';
import { GlobalPreloaderComponent } from '@shared/components/global-preloader/global-preloader.component';
import { environment } from '@env/environment';

registerLocaleData(en);

@NgModule({
  declarations: [AppComponent, LayoutComponent, HeaderComponent, GlobalPreloaderComponent],
  imports: [
    CoreModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,

    NzSpinModule,
    NzDropDownModule,
    NzAvatarModule,
    NzButtonModule,
    NzMenuModule,
    NzLayoutModule,
    NzPageHeaderModule,
    NzIconModule.forRoot([
      MenuFoldOutline,
      MenuUnfoldOutline,
      DashboardOutline,
      SettingOutline,
    ]),

    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([UserEffects])
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
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
