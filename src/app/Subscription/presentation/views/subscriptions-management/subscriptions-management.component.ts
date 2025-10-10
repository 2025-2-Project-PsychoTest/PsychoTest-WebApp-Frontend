import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

// Importaciones de la aplicación (Rutas corregidas)
import { SubscriptionStore } from '../../../application/subscription-store';
import { Subscription } from '../../../domain/model/subscription.entity';

// Importaciones de los componentes hijos
import { SubscriptionFormComponent } from './subscription-form/subscription-form.component';
import { SubscriptionListComponent } from './subscription-list/subscription-list.component';

@Component({
  selector: 'app-subscriptions-management',
  standalone: true,
  imports: [
    CommonModule,
    SubscriptionFormComponent, // Componente del formulario
    SubscriptionListComponent  // Componente de la lista
  ],
  templateUrl: './subscriptions-management.component.html',
  styleUrls: ['./subscriptions-management.component.css']
})
export class SubscriptionsManagementComponent implements OnInit {

  // Observables para conectar el estado del store a la plantilla
  subscriptions$: Observable<Subscription[]>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;

  // Propiedad para mantener la suscripción que se está editando
  selectedSubscription: Subscription | null = null;

  /**
   * Inyecta el store y asigna los observables.
   * @param store - El servicio de gestión de estado para las suscripciones.
   */
  constructor(private store: SubscriptionStore) {
    this.subscriptions$ = this.store.subscriptions$;
    this.loading$ = this.store.loading$;
    this.error$ = this.store.error$;
  }

  /**
   * Carga los datos iniciales cuando el componente se inicia.
   */
  ngOnInit(): void {
    this.store.loadSubscriptions();
  }

  /**
   * Maneja el evento 'save' del formulario.
   * Decide si crear una nueva suscripción o actualizar una existente.
   * @param subscription - La suscripción a guardar.
   */
  handleSave(subscription: Subscription): void {
    if (this.selectedSubscription && this.selectedSubscription.id === subscription.id) {
      // Actualizar la suscripción existente
      this.store.updateSubscription(subscription);
    } else {
      // Crear una nueva suscripción
      this.store.createSubscription(subscription);
    }
    this.clearSelection();
  }

  /**
   * Maneja el evento 'edit' de la lista.
   * Establece la suscripción seleccionada para pasarla al formulario.
   * @param subscription - La suscripción a editar.
   */
  handleEdit(subscription: Subscription): void {
    this.selectedSubscription = subscription;
  }

  /**
   * Maneja el evento 'delete' de la lista.
   * Llama al store para eliminar la suscripción.
   * @param id - El ID de la suscripción a eliminar.
   */
  handleDelete(id: number): void {
    this.store.deleteSubscription(id);
    // Si la suscripción eliminada era la que se estaba editando, limpiamos la selección
    if (this.selectedSubscription && this.selectedSubscription.id === id) {
      this.clearSelection();
    }
  }

  /**
   * Limpia la suscripción seleccionada, reiniciando el formulario.
   */
  clearSelection(): void {
    this.selectedSubscription = null;
  }
}


