import { inject, Injectable, signal } from '@angular/core';
import { HttpNotificationRepo } from '../../infrastructure/adapters/http-notification.repo';
import { Notification } from '../../domain/models/notification.model';
import { ListParams } from '../ports/notification.repo';

@Injectable({ providedIn: 'root' })
export class ListNotificationsUseCase {
  private repo = inject(HttpNotificationRepo);
  items = signal<Notification[]>([]);
  loading = signal(false);

  async exec(params?: ListParams) {
    this.loading.set(true);
    try { this.items.set(await this.repo.list({ _sort: 'createdAt', _order: 'desc', ...(params ?? {}) })); }
    finally { this.loading.set(false); }
  }
}
