import { Routes } from '@angular/router';
import { noAuthGuard } from './core/guards/no-auth.guard';
import { authGuard } from './core/guards/auth.guard';

export const APP_ROUTES: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    canActivate: [noAuthGuard],
    loadComponent: () =>
      import('./core/components/login/login.component').then(
        (c) => c.LoginComponent
      ),
  },
  {
    path: '',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./modules/admin/main/main.routes').then((m) => m.MAIN_ROUTES),
  },
  {
    path: '**',
    loadComponent: () =>
      import('./core/components/not-found/not-found.component').then(
        (c) => c.NotFoundComponent
      ),
  },
];
