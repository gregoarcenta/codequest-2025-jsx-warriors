import { Routes } from '@angular/router';

export const profileRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                loadComponent: () => import('./profile.component')
            },
            {
                path: '**',
                redirectTo: ''
            }
        ]
    }
];