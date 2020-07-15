import { NgModule } from '@angular/core';
import { registerLocaleData, CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import en from '@angular/common/locales/en';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import {
  NZ_I18N,
  en_US,
  NzModalModule,
  NzSelectModule,
  NzFormModule,
} from 'ng-zorro-antd';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzResultModule } from 'ng-zorro-antd/result';
import {
  MenuFoldOutline,
  MenuUnfoldOutline,
  DashboardOutline,
  SettingOutline,
} from '@ant-design/icons-angular/icons';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { CoreModule } from '@core/core.module';
import { GeoService } from '@core/services/geo.service';
import { UserService } from '@core/services/user.service';
import { StatusService } from '@core/services/status.service';
import { RequestService } from '@core/services/request.service';

import { environment } from '@env/environment';
import { reducers, effects } from '@store/index';
import { HeaderComponent } from '@shared/components/header/header.component';
import { LayoutComponent } from '@shared/components/layout/layout.component';
import { GlobalPreloaderComponent } from '@shared/components/global-preloader/global-preloader.component';
import { ResultComponent } from '@shared/components/result/result.component';
import { CreateRequestModalModule } from '@shared/components/modal/create-request-modal/create-request-modal.module';

registerLocaleData(en);

@NgModule({
  imports: [
    CoreModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,

    NzFormModule,
    NzSelectModule,
    NzSpinModule,
    NzDropDownModule,
    NzAvatarModule,
    NzButtonModule,
    NzMenuModule,
    NzLayoutModule,
    NzPageHeaderModule,
    NzModalModule,
    NzMessageModule,
    NzResultModule,
    NzIconModule.forRoot([
      MenuFoldOutline,
      MenuUnfoldOutline,
      DashboardOutline,
      SettingOutline,
    ]),

    CreateRequestModalModule,

    StoreModule.forRoot(reducers),
    EffectsModule.forRoot(effects),

    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
  ],
  declarations: [
    AppComponent,
    LayoutComponent,
    HeaderComponent,
    GlobalPreloaderComponent,
    ResultComponent,
  ],
  providers: [
    {
      provide: NZ_I18N,
      useValue: en_US,
    },
    GeoService,
    UserService,
    StatusService,
    RequestService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
