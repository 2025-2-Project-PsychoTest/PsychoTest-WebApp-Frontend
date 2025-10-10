import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { CreateNotificationUseCase } from '../../../application/use-cases/create-notification.usecase';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-som-create',
  templateUrl: './som-create.view.html',
  styleUrl: './som-create.view.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, TranslateModule]
})
export class SomCreateView {
  private createUC = inject(CreateNotificationUseCase);
  private router = inject(Router);

  form = new FormGroup({
    userId: new FormControl('U-001', { nonNullable: true }),
    title: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    body: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    category: new FormControl<'EXAM'|'REMINDER'|'SYSTEM'>('EXAM', { nonNullable: true }),
    priority: new FormControl<'LOW'|'MEDIUM'|'HIGH'>('MEDIUM', { nonNullable: true }),
    scheduledAt: new FormControl<string | null>(null)
  });

  loading = signal(false);

  async save() {
    if (this.form.invalid) return;
    this.loading.set(true);
    try {
      const v = this.form.getRawValue();
      await this.createUC.exec({
        userId: v.userId!,
        title: v.title!,
        body: v.body!,
        category: v.category!,
        priority: v.priority!,
        scheduledAt: v.scheduledAt ?? undefined
      });
      await this.router.navigate(['/som']);
    } finally {
      this.loading.set(false);
    }
  }
}
