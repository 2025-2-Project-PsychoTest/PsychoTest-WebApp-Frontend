import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { NotificationRepo, ListParams } from '../../application/ports/notification.repo';
import { Notification } from '../../domain/models/notification.model';

const BASE = 'http://localhost:3000';
const RESOURCE = `${BASE}/som_notifications`;

@Injectable({ providedIn: 'root' })
export class HttpNotificationRepo implements NotificationRepo {
  private http = inject(HttpClient);

  async list(params: ListParams = {}): Promise<Notification[]> {
    let hp = new HttpParams();
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== null && v !== '') hp = hp.set(k, String(v));
    });
    console.log('[SOM] GET =>', RESOURCE, hp.toString());
    return firstValueFrom(this.http.get<Notification[]>(RESOURCE, { params: hp }));
  }

  async unreadCount(): Promise<number> {
    const res = await this.list({ status: 'UNREAD' });
    return res.length;
  }

  async markAsRead(id: number | string): Promise<void> {
    await firstValueFrom(this.http.patch(`${RESOURCE}/${id}`, { status: 'READ' }));
  }

  async delete(id: number | string): Promise<void> {
    await firstValueFrom(this.http.delete(`${RESOURCE}/${id}`));
  }

  async create(dto: Omit<Notification, 'id' | 'status' | 'createdAt'> & { status?: 'UNREAD' | 'READ' }): Promise<Notification> {
    const payload: Partial<Notification> = {
      ...dto,
      status: dto.status ?? 'UNREAD',
      createdAt: new Date().toISOString()
    };
    return firstValueFrom(this.http.post<Notification>(RESOURCE, payload));
  }
}
