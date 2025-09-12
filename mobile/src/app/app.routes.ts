import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('@auth/auth.routes').then((r) => r.authRoutes)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('@dashboard/dashboard.routes').then((r) => r.dashboardRoutes)
  },
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'auth'
  }
];
