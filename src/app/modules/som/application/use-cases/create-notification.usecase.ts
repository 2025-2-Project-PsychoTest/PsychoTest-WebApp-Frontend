import { inject, Injectable } from '@angular/core';
import { HttpNotificationRepo } from '../../infrastructure/adapters/http-notification.repo';
import { Notification } from '../../domain/models/notification.model';

@Injectable({ providedIn: 'root' })
export class CreateNotificationUseCase {
  private repo = inject(HttpNotificationRepo);
  exec(dto: Omit<Notification, 'id' | 'status' | 'createdAt'> & { status?: 'UNREAD' | 'READ' }) {
    return this.repo.create(dto);
  }
}
