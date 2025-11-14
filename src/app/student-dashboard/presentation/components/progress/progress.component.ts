import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { MatProgressBar } from '@angular/material/progress-bar';
import { MatIcon } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { Progress } from '../../../domain/model/progress.entity';

@Component({
  selector: 'app-progress',
  imports: [
    MatProgressBar,
    MatIcon,
    TranslateModule
  ],
  templateUrl: './progress.component.html',
  styleUrl: './progress.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProgressComponent {
  progress = input.required<Progress>();
}

