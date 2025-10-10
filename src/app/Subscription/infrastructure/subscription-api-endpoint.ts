import {BaseApiEndpoint} from '../../shared/infrastructure/base-api-endpoint';
import {Subscription} from '../domain/model/subscription.entity';
import {SubscriptionsResponse, SubscriptionResource} from './subscription-response';
import {SubscriptionAssembler} from './subscription-assembler';
import {HttpClient} from '@angular/common/http';
import { environment } from '../../environment/environment';

export class SubscriptionsApiEndpoint extends BaseApiEndpoint<Subscription, SubscriptionResource, SubscriptionsResponse, SubscriptionAssembler> {
  /**
   * Creates an instance of SubscriptionsApiEndpoint.
   * @param http - The HttpClient to be used for making API requests.
   */
  constructor(http: HttpClient) {
    // Note: You will need to add 'platformProviderSubscriptionsEndpointPath' to your environment files.
    // For example: platformProviderSubscriptionsEndpointPath: '/subscriptions'
    super(http, `${environment.platformProviderApiBaseUrl}${environment.platformProviderSubscriptionsEndpointPath}`,
      new SubscriptionAssembler());
  }
}
