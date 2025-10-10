import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-subscription-status-badge',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './subscription-status-badge.component.html',
  styleUrls: ['./subscription-status-badge.component.css']
})
export class SubscriptionStatusBadgeComponent {


  @Input() isActive: boolean = false;

}
