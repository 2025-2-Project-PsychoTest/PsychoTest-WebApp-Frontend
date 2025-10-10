import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { BaseApi } from '../../shared/infrastructure/base-api';
import { Subscription } from '../domain/model/subscription.entity';
import { SubscriptionsApiEndpoint } from './subscription-api-endpoint';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionApi extends BaseApi {

  private readonly subscriptionsEndpoint: SubscriptionsApiEndpoint;

  constructor(http: HttpClient) {
    super();
    this.subscriptionsEndpoint = new SubscriptionsApiEndpoint(http);
  }

  /**
   * Retrieves all subscriptions from the API.
   * @returns An Observable for an array of Subscription objects.
   */
  getSubscriptions(): Observable<Subscription[]> {
    return this.subscriptionsEndpoint.getAll();
  }

  /**
   * Retrieves a single subscription by its ID.
   * @param id - The ID of the subscription.
   * @returns An Observable of the Subscription object.
   */
  getSubscription(id: number): Observable<Subscription> {
    return this.subscriptionsEndpoint.getById(id);
  }

  /**
   * Creates a new subscription.
   * @param subscription - The subscription data to create.
   * @returns An Observable of the created Subscription object.
   */
  createSubscription(subscription: Subscription): Observable<Subscription> {
    return this.subscriptionsEndpoint.create(subscription);
  }

  /**
   * Updates an existing subscription.
   * @param subscription - The subscription data to update.
   * @returns An Observable of the updated Subscription object.
   */
  updateSubscription(subscription: Subscription): Observable<Subscription> {
    return this.subscriptionsEndpoint.update(subscription, subscription.id);
  }

  /**
   * Deletes a subscription by its ID.
   * @param id - The ID of the subscription to delete.
   * @returns An Observable of void.
   */
  deleteSubscription(id: number): Observable<void> {
    return this.subscriptionsEndpoint.delete(id);
  }
}
