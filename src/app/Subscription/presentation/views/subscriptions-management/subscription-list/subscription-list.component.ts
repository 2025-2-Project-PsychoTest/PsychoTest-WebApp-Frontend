import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { Subscription } from '../../../../domain/model/subscription.entity';
import { SubscriptionStatusBadgeComponent } from '../../../components/subscription-status-badge/subscription-status-badge.component';

@Component({
  selector: 'app-subscription-list',
  standalone: true,
  imports: [
    CommonModule,
    DatePipe,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
    SubscriptionStatusBadgeComponent,
  ],
  templateUrl: './subscription-list.component.html',
  styleUrls: ['./subscription-list.component.css']
})
export class SubscriptionListComponent {

  @Input() subscriptions: Subscription[] = [];

  @Output() edit = new EventEmitter<Subscription>();

  @Output() delete = new EventEmitter<number>();


  displayedColumns: string[] = [
    'id',
    'userId',
    'planId',
    'startDate',
    'endDate',
    'isActive',
    'actions' // Columna para los botones de editar/eliminar
  ];

  constructor() {}

  /**
   * Se ejecuta cuando el usuario hace clic en el botón de editar.
   * Emite el objeto de la suscripción completa.
   * @param subscription - La suscripción de la fila seleccionada.
   */
  onEdit(subscription: Subscription): void {
    this.edit.emit(subscription);
  }

  /**
   * Se ejecuta cuando el usuario hace clic en el botón de eliminar.
   * Emite solo el ID de la suscripción.
   * @param id - El ID de la suscripción de la fila seleccionada.
   */
  onDelete(id: number): void {
    this.delete.emit(id);
  }
}
