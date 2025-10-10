import { Routes } from '@angular/router';
import { Home } from './shared/presentation/views/home/home';
import { Layout } from './shared/presentation/components/layout/layout'; // <-- Importa tu Layout

const pageNotFound = () => import('./shared/presentation/views/page-not-found/page-not-found').then(m => m.PageNotFound);
const baseTitle = 'PsychoTest';

export const routes: Routes = [
  {
    path: '',
    component: Layout,
    children: [
      { path: 'home', component: Home, title: `${baseTitle} - Home` },


      {
        path: 'student',
        children: [
          {
            path: 'subscription',
            title: `${baseTitle} - Suscripción`,
            loadChildren: () =>
              import('./Subscription/subscription.routes').then(
                (m) => m.SUBSCRIPTION_ROUTES
              ),
          },
        ]
      },


      {
        path: 'psychologist',
        children: [
          {
            path: 'subscription',
            title: `${baseTitle} - Suscripción`,
            loadChildren: () =>
              import('./Subscription/subscription.routes').then(
                (m) => m.SUBSCRIPTION_ROUTES
              ),
          },
        ]
      },

      //
      { path: '', redirectTo: '/home', pathMatch: 'full' },
    ]
  },

  { path: '**', loadComponent: pageNotFound, title: `${baseTitle} - Page Not Found` },
];


