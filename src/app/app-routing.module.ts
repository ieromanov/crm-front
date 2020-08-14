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
        data: {
          header: 'Dashboard',
        },
      },
      {
        path: 'request/:id',
        loadChildren: () =>
          import('./modules/request-details/request-details.module').then(
            (m) => m.RequestDetailsModule
          ),
        data: {
          header: 'Request info',
        },
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('./modules/profile/profile.module').then(
            (m) => m.ProfileModule
          ),
        data: {
          header: 'Profile info',
        },
      },
      {
        path: 'setting',
        loadChildren: () =>
          import('./modules/setting/setting.module').then(
            (m) => m.SettingModule
          ),
        data: {
          header: 'Setting',
        },
      },
      {
        path: 'error',
        component: ResultComponent,
        data: {
          status: '500',
          header: 'Server error',
          title: '500 Error',
          subtitle: 'Sorry, there is an error on server.',
        },
      },
      {
        path: 'no-access',
        component: ResultComponent,
        data: {
          status: '403',
          header: 'Access denied',
          title: '403 No Access',
          subtitle: 'Sorry, you are not authorized to access this page.',
        },
      },
      {
        path: '**',
        component: ResultComponent,
        data: {
          status: '404',
          header: 'Page not found',
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
