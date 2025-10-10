import { inject, Injectable } from '@angular/core';
import { HttpNotificationRepo } from '../../infrastructure/adapters/http-notification.repo';

@Injectable({ providedIn: 'root' })
export class DeleteNotificationUseCase {
  private repo = inject(HttpNotificationRepo);
  exec(id: number | string) { return this.repo.delete(id); }
}
