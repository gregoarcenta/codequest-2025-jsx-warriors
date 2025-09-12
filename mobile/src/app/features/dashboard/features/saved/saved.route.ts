import { Routes } from '@angular/router';

export const savedRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                loadComponent: () => import('./saved.component')
            },
            {
                path: '**',
                redirectTo: ''
            }
        ]
    }
];