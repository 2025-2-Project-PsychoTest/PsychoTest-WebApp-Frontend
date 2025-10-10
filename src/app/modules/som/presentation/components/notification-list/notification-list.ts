import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ListNotificationsUseCase } from '../../../application/use-cases/list-notifications.usecase';
import { MarkAsReadUseCase } from '../../../application/use-cases/mark-as-read.usecase';
import { DeleteNotificationUseCase } from '../../../application/use-cases/delete-notification.usecase';
import { NotificationCategory, NotificationStatus } from '../../../domain/models/enums';
import { DatePipe } from '@angular/common';
import { NotificationItemComponent } from '../notification-item/notification-item'; // <-- importar
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.html',
  styleUrl: './notification-list.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DatePipe, NotificationItemComponent, TranslateModule] //
})
export class NotificationListComponent {
  private listUC = inject(ListNotificationsUseCase);
  private readUC = inject(MarkAsReadUseCase);
  private delUC = inject(DeleteNotificationUseCase);

  status = signal<NotificationStatus | ''>('');
  category = signal<NotificationCategory | ''>('');
  q = signal<string>('');

  items = this.listUC.items;
  loading = this.listUC.loading;

  constructor() { void this.reload(); }

  async reload() {
    await this.listUC.exec({
      status: this.status() || undefined,
      category: this.category() || undefined,
      q: this.q() || undefined,
      _sort: 'createdAt',
      _order: 'desc'
    });
  }

  // Handlers seguros (evitan errores de parser y null)
  onStatusChange(e: Event) {
    const value = (e.target as HTMLSelectElement | null)?.value as NotificationStatus | '' || '';
    this.status.set(value);
    void this.reload();
  }

  onCategoryChange(e: Event) {
    const value = (e.target as HTMLSelectElement | null)?.value as NotificationCategory | '' || '';
    this.category.set(value);
    void this.reload();
  }

  onQuery(e: Event) {
    const value = (e.target as HTMLInputElement | null)?.value || '';
    this.q.set(value);
    void this.reload();
  }

  async onMarkRead(id: number | string) {
    await this.readUC.exec(id);
    await this.reload();
  }

  async onDelete(id: number | string) {
    await this.delUC.exec(id);
    await this.reload();
  }
}
