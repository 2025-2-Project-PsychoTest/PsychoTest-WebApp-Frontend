import { NotificationCategory, NotificationPriority, NotificationStatus } from './enums';

export interface Notification {
  id: number | string;
  userId: string;
  category: NotificationCategory;
  priority: NotificationPriority;
  title: string;
  body: string;
  status: NotificationStatus;
  createdAt: string;           // ISO string
  scheduledAt?: string;
  expiresAt?: string;
  metadata?: Record<string, unknown>;
}
