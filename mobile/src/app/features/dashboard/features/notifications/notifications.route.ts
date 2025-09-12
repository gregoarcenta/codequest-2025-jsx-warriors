import { Routes } from '@angular/router';

export const notificationsRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                loadComponent: () => import('./notifications.component')
            },
            {
                path: '**',
                redirectTo: ''
            }
        ]
    }
];