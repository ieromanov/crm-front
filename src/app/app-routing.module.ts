import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from '@shared/components/layout/layout.component';
import { ResultComponent } from '@shared/components/result/result.component';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./modules/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: 'setting',
        loadChildren: () =>
          import('./modules/setting/setting.module').then(
            (m) => m.SettingModule
          ),
      },
      {
        path: 'error',
        component: ResultComponent,
        data: {
          status: '500',
          title: '500 Error',
          subtitle: 'Sorry, there is an error on server.',
        },
      },
      {
        path: 'no-access',
        component: ResultComponent,
        data: {
          status: '403',
          title: '403 No Access',
          subtitle: 'Sorry, you are not authorized to access this page.',
        },
      },
      {
        path: '**',
        component: ResultComponent,
        data: {
          status: '404',
          title: '404 Not Found',
          subtitle:
            "Oops... We can't find the page you are looking for. May be the page is moved from here or deleted.",
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
