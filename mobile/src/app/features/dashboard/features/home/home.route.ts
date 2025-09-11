import { Routes } from '@angular/router';

export const homeRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                loadComponent: () => import('./home.component')
            },
            {
                path: '**',
                redirectTo: ''
            }
        ]
    }
];