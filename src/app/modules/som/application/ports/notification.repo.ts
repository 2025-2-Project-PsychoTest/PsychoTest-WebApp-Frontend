import { Notification } from '../../domain/models/notification.model';
import { NotificationCategory, NotificationStatus } from '../../domain/models/enums';

export interface ListParams {
  status?: NotificationStatus;
  category?: NotificationCategory;
  q?: string;           // búsqueda simple por title/body
  _sort?: string;       // createdAt
  _order?: 'asc' | 'desc';
  _page?: number;
  _limit?: number;
}

export abstract class NotificationRepo {
  abstract list(params?: ListParams): Promise<Notification[]>;
  abstract unreadCount(): Promise<number>;
  abstract markAsRead(id: number | string): Promise<void>;
  abstract delete(id: number | string): Promise<void>;
  abstract create(dto: Omit<Notification, 'id' | 'status' | 'createdAt'> & { status?: 'UNREAD' | 'READ' }): Promise<Notification>;
}
