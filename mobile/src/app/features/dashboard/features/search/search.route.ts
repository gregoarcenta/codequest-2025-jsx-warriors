import { Routes } from '@angular/router';

export const searchRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                loadComponent: () => import('./search.component')
            },
            {
                path: '**',
                redirectTo: ''
            }
        ]
    }
];