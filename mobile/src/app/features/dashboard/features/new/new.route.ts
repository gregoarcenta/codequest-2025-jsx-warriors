import { Routes } from '@angular/router';

export const newRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                loadComponent: () => import('./new.component')
            },
            {
                path: '**',
                redirectTo: ''
            }
        ]
    }
];