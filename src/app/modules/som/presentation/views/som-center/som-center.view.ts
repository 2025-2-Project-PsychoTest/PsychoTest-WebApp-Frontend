import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NotificationListComponent } from '../../components/notification-list/notification-list';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-som-center',
  templateUrl: './som-center.view.html',
  styleUrl: './som-center.view.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NotificationListComponent, RouterLink, TranslateModule]
})
export class SomCenterView {}
