import {BaseAssembler} from '../../shared/infrastructure/base-assembler';
import {Subscription} from '../domain/model/subscription.entity';
import {SubscriptionsResponse, SubscriptionResource} from './subscription-response';

export class SubscriptionAssembler implements BaseAssembler<Subscription, SubscriptionResource, SubscriptionsResponse> {
  /**
   * Converts a SubscriptionsResponse from the API to an array of Subscription domain entities.
   * @param response - The API response containing a list of subscriptions.
   * @returns An array of Subscription entities.
   */
  toEntitiesFromResponse(response: SubscriptionsResponse): Subscription[] {
    return response.subscriptions.map(resource => this.toEntityFromResource(resource as SubscriptionResource));
  }

  /**
   * Converts a single SubscriptionResource (DTO) to a Subscription domain entity.
   * It handles the crucial conversion of string dates from the API into Date objects for the domain.
   * @param resource - The subscription resource from the API.
   * @returns The converted Subscription entity.
   */
  toEntityFromResource(resource: SubscriptionResource): Subscription {
    return new Subscription({
      id: resource.id,
      userId: resource.userId,
      planId: resource.planId,
      // Convert ISO string from API to a Date object for the domain entity
      startDate: new Date(resource.startDate),
      endDate: resource.endDate ? new Date(resource.endDate) : undefined,
      isActive: resource.isActive,
    });
  }

  /**
   * Converts a Subscription domain entity back to a SubscriptionResource (DTO).
   * This is useful for sending data to the API (e.g., in a POST or PUT request).
   * @param entity - The subscription entity to convert.
   * @returns The converted SubscriptionResource.
   */
  toResourceFromEntity(entity: Subscription): SubscriptionResource {
    return {
      id: entity.id,
      userId: entity.userId,
      planId: entity.planId,
      // Convert Date object from domain to an ISO string for the API
      startDate: entity.startDate.toISOString(),
      endDate: entity.endDate?.toISOString(),
      isActive: entity.isActive,
    } as SubscriptionResource;
  }
}
