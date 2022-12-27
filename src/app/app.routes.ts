import { Routes } from '@angular/router';

export const AppRoutes: Routes = [
  { path: '', redirectTo: 'users', pathMatch: 'full' },
  {
    path: 'users',
    loadChildren: () =>
      import('./components/users/users.routes').then(
        (routes) => routes.UserRoutes
      ),
  },
];
