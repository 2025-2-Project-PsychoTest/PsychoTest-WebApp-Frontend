import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { HttpNotificationRepo } from '../../../infrastructure/adapters/http-notification.repo';

@Component({
  selector: 'app-bell-indicator',
  templateUrl: './bell-indicator.html',
  styleUrl: './bell-indicator.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [HttpClientModule]
})
export class BellIndicatorComponent {
  private repo = inject(HttpNotificationRepo);
  private router = inject(Router);
  unread = signal<number>(0);

  constructor() {
    // carga inicial
    void this.refresh();
  }

  async refresh() {
    this.unread.set(await this.repo.unreadCount());
  }

  goToCenter() {
    this.router.navigate(['/som']);
  }
}
