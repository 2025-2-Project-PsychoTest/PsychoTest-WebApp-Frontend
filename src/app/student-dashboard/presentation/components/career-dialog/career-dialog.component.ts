import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { Career } from '../../../domain/model/career.entity';

@Component({
  selector: 'app-career-dialog',
  imports: [
    TranslateModule,
    MatIcon,
    MatButton
  ],
  templateUrl: './career-dialog.component.html',
  styleUrl: './career-dialog.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CareerDialogComponent {
  readonly dialogRef = inject(MatDialogRef<CareerDialogComponent>);
  readonly data = inject<{ careers: Career[] }>(MAT_DIALOG_DATA);

  closeDialog(): void {
    this.dialogRef.close();
  }
}
