import { Component, ChangeDetectionStrategy, input, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { TranslateModule } from '@ngx-translate/core';
import { Career } from '../../../domain/model/career.entity';
import { CareerDialogComponent } from '../career-dialog/career-dialog.component';

@Component({
  selector: 'app-recommended-careers',
  imports: [
    MatIcon,
    MatButton,
    TranslateModule
  ],
  templateUrl: './recommended-careers.component.html',
  styleUrl: './recommended-careers.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecommendedCareersComponent {
  private readonly dialog = inject(MatDialog);

  careers = input.required<Career[]>();

  openCareerDialog(): void {
    const careersData = this.careers();
    if (careersData && careersData.length > 0) {
      this.dialog.open(CareerDialogComponent, {
        width: '600px',
        data: { careers: careersData }
      });
    }
  }
}
