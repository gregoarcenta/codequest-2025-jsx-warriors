import { Routes } from '@angular/router';

export const categoriesRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                loadComponent: () => import('./categories.component')
            },
            {
                path: '**',
                redirectTo: ''
            }
        ]
    }
];