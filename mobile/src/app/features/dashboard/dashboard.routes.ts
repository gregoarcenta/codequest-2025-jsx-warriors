import { Routes } from '@angular/router';
import { LayoutComponent } from './core/layout/layout.component';

export const dashboardRoutes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: 'home',
                loadChildren: () => import('@home/home.route').then((r) => r.homeRoutes),
            },
            {
                path: 'categories',
                loadChildren: () => import('@categories/categories.route').then((r) => r.categoriesRoutes),
            },
            {
                path: 'new',
                loadChildren: () => import('@new/new.route').then((r) => r.newRoutes),
            },
            {
                path: 'notifications',
                loadChildren: () => import('@notifications/notifications.route').then((r) => r.notificationsRoutes),
            },
            {
                path: 'profile',
                loadChildren: () => import('@profile/profile.route').then((r) => r.profileRoutes),
            },
            {
                path: 'saved',
                loadChildren: () => import('@saved/saved.route').then((r) => r.savedRoutes),
            },
            {
                path: 'search',
                loadChildren: () => import('@search/search.route').then((r) => r.searchRoutes),
            },
            {
                path: '',
                redirectTo: 'home',
                pathMatch: 'full'
            },
            {
                path: '**',
                redirectTo: 'home'
            }
        ]
    },

];