import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { DatePipe } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-notification-item',
  templateUrl: './notification-item.html',
  styleUrl: './notification-item.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DatePipe, TranslateModule]
})
export class NotificationItemComponent {
  item = input.required<import('../../../domain/models/notification.model').Notification>();
  markRead = output<number | string>();
  remove = output<number | string>();
}
