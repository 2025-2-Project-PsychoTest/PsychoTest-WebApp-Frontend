import { Routes } from '@angular/router';
import { SubscriptionsManagementComponent } from './presentation/views/subscriptions-management/subscriptions-management.component';

/**
 * Define las rutas para el módulo de Suscripciones.
 */
export const SUBSCRIPTION_ROUTES: Routes = [
  {
    // Cuando el usuario navegue a la raíz de este módulo (ej: /subscription),
    // carga el componente de gestión principal.
    path: '',
    component: SubscriptionsManagementComponent,
  },
  // Aquí podrías añadir más rutas específicas si las necesitaras,
  // como una página de detalles de una suscripción.
  // { path: ':id', component: SubscriptionDetailComponent },
];

