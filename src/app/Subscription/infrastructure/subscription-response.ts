import {BaseResource, BaseResponse} from '../../shared/infrastructure/base-response';

/**
 * Represents the API response structure for a list of subscriptions.
 * This is the object you would expect when fetching multiple subscriptions.
 */
export interface SubscriptionsResponse extends BaseResponse {
  /**
   * The list of subscription resources returned by the API.
   */
  subscriptions: SubscriptionResource[];
}

/**
 * Represents the API resource/DTO for a single subscription.
 * This defines the shape of one subscription object as it comes from the backend.
 */
export interface SubscriptionResource extends BaseResource {
  id: number;
  userId: number;
  planId: number;
  /**
   * The start date of the subscription, typically in ISO 8601 string format (e.g., "2023-10-27T10:00:00Z").
   */
  startDate: string;
  /**
   * The end date of the subscription, if applicable. Also typically an ISO 8601 string.
   */
  endDate?: string;
  isActive: boolean;
}
