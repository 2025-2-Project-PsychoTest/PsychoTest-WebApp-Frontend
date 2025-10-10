import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Subscription } from '../domain/model/subscription.entity';
import { SubscriptionApi } from '../infrastructure/subscription-api';

// 1. Definir la forma del estado
export interface SubscriptionState {
  subscriptions: Subscription[];
  selectedSubscription: Subscription | null;
  loading: boolean;
  error: string | null;
}

// 2. Crear el estado inicial
let _state: SubscriptionState = {
  subscriptions: [],
  selectedSubscription: null,
  loading: false,
  error: null,
};

@Injectable({
  providedIn: 'root'
})
export class SubscriptionStore {

  // 3. Usar BehaviorSubject para emitir el estado
  private readonly store = new BehaviorSubject<SubscriptionState>(_state);
  private readonly state$ = this.store.asObservable();

  // 4. Exponer observables públicos para que los componentes se suscriban
  readonly subscriptions$: Observable<Subscription[]> = this.state$.pipe(map(state => state.subscriptions));
  readonly selectedSubscription$: Observable<Subscription | null> = this.state$.pipe(map(state => state.selectedSubscription));
  readonly loading$: Observable<boolean> = this.state$.pipe(map(state => state.loading));
  readonly error$: Observable<string | null> = this.state$.pipe(map(state => state.error));

  constructor(private readonly subscriptionApi: SubscriptionApi) {}

  // 5. Métodos públicos para interactuar con el estado y la API

  /**
   * Carga todas las suscripciones desde la API y actualiza el estado.
   */
  loadSubscriptions(): void {
    this.updateState({ ..._state, loading: true, error: null });

    this.subscriptionApi.getSubscriptions().pipe(
      tap(subscriptions => {
        this.updateState({ ..._state, subscriptions, loading: false });
      }),
      catchError(error => {
        this.updateState({ ..._state, loading: false, error: 'Failed to load subscriptions' });
        return of([]); // Devuelve un observable vacío para que el stream no se rompa
      })
    ).subscribe();
  }

  /**
   * Crea una nueva suscripción.
   * @param subscription - La suscripción a crear.
   */
  createSubscription(subscription: Subscription): void {
    this.updateState({ ..._state, loading: true });

    this.subscriptionApi.createSubscription(subscription).pipe(
      tap(newSubscription => {
        const updatedSubscriptions = [..._state.subscriptions, newSubscription];
        this.updateState({ ..._state, subscriptions: updatedSubscriptions, loading: false });
      }),
      catchError(error => {
        this.updateState({ ..._state, loading: false, error: 'Failed to create subscription' });
        return of(null);
      })
    ).subscribe();
  }

  /**
   * Actualiza una suscripción existente.
   * @param subscription - La suscripción con los datos actualizados.
   */
  updateSubscription(subscription: Subscription): void {
    this.updateState({ ..._state, loading: true });

    this.subscriptionApi.updateSubscription(subscription).pipe(
      tap(updatedSubscription => {
        const updatedSubscriptions = _state.subscriptions.map(s =>
          s.id === updatedSubscription.id ? updatedSubscription : s
        );
        this.updateState({ ..._state, subscriptions: updatedSubscriptions, loading: false, selectedSubscription: null });
      }),
      catchError(error => {
        this.updateState({ ..._state, loading: false, error: 'Failed to update subscription' });
        return of(null);
      })
    ).subscribe();
  }

  /**
   * Elimina una suscripción por su ID.
   * @param id - El ID de la suscripción a eliminar.
   */
  deleteSubscription(id: number): void {
    this.updateState({ ..._state, loading: true });

    this.subscriptionApi.deleteSubscription(id).pipe(
      tap(() => {
        const updatedSubscriptions = _state.subscriptions.filter(s => s.id !== id);
        this.updateState({ ..._state, subscriptions: updatedSubscriptions, loading: false });
      }),
      catchError(error => {
        this.updateState({ ..._state, loading: false, error: 'Failed to delete subscription' });
        return of(null);
      })
    ).subscribe();
  }

  /**
   * Selecciona una suscripción para edición.
   * @param subscription - La suscripción a seleccionar.
   */
  selectSubscription(subscription: Subscription | null): void {
    this.updateState({ ..._state, selectedSubscription: subscription });
  }

  // Método privado para actualizar y emitir el nuevo estado
  private updateState(newState: SubscriptionState): void {
    _state = newState;
    this.store.next(_state);
  }
}

