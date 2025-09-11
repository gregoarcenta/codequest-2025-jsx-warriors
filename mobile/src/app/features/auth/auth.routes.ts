import { Routes } from '@angular/router';

export const authRoutes: Routes = [
    {
        path: 'login',
        loadComponent: () => import('@auth/features/login/login.component')
    },
    {
        path: 'register',
        loadComponent: () => import('@auth/features/register/register.component')
    },
    {
        path: 'recovery-password',
        loadComponent: () => import('@auth/features/recovery-password/recovery-password.component')
    },
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: '**',
        redirectTo: 'login'
    }
];