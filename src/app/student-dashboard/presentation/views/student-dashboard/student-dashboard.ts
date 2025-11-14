import { Component, ChangeDetectionStrategy, inject, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { StudentDashboardStore } from '../../../application/student-dashboard-store';
import { ProgressComponent } from '../../components/progress/progress.component';
import { RecommendedCareersComponent } from '../../components/recommended-careers/recommended-careers.component';

@Component({
  selector: 'app-student-dashboard',
  imports: [
    TranslateModule,
    ProgressComponent,
    RecommendedCareersComponent
  ],
  templateUrl: './student-dashboard.html',
  styleUrl: './student-dashboard.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StudentDashboard implements OnInit {
  protected readonly store = inject(StudentDashboardStore);

  ngOnInit(): void {
    this.store.loadStudentById(1);
  }
}

