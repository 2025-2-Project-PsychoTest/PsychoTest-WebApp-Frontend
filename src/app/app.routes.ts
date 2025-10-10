import { Routes } from '@angular/router';
import { Home } from './shared/presentation/views/home/home';
import { Layout } from './shared/presentation/components/layout/layout'; // <-- Importa tu Layout

const pageNotFound = () => import('./shared/presentation/views/page-not-found/page-not-found').then(m => m.PageNotFound);
const baseTitle = 'PsychoTest';

export const routes: Routes = [
  // Ruta Padre para el Layout principal
  {
    path: '',
    component: Layout, // Carga el Layout que contiene la barra lateral y el <router-outlet>
    children: [
      { path: 'home', component: Home, title: `${baseTitle} - Home` },

      // --- RUTAS ANIDADAS PARA EL ROL DE ESTUDIANTE ---
      {
        path: 'student',
        children: [
          // { path: 'profile', component: StudentProfileComponent }, // Ejemplo de otra ruta
          {
            path: 'subscription', // Coincide con student/subscription
            title: `${baseTitle} - Suscripción`,
            loadChildren: () =>
              import('./Subscription/subscription.routes').then(
                (m) => m.SUBSCRIPTION_ROUTES
              ),
          },
        ]
      },

      // --- RUTAS ANIDADAS PARA EL ROL DE PSICÓLOGO ---
      {
        path: 'psychologist',
        children: [
          // { path: 'profile', component: PsychologistProfileComponent }, // Ejemplo
          {
            path: 'subscription', // Coincide con psychologist/subscription
            title: `${baseTitle} - Suscripción`,
            loadChildren: () =>
              import('./Subscription/subscription.routes').then(
                (m) => m.SUBSCRIPTION_ROUTES
              ),
          },
        ]
      },

      // Redirección inicial
      { path: '', redirectTo: '/home', pathMatch: 'full' },
    ]
  },

  // La página no encontrada va fuera del layout principal
  { path: '**', loadComponent: pageNotFound, title: `${baseTitle} - Page Not Found` },
];


