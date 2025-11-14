import { inject, Injectable, signal, computed } from '@angular/core';
import { StudentDashboardApi } from '../infrastructure/student-dashboard-api';
import { Student } from '../domain/model/student.entity';

@Injectable({
  providedIn: 'root'
})
export class StudentDashboardStore {
  private readonly api = inject(StudentDashboardApi);

  private readonly studentSignal = signal<Student | null>(null);
  private readonly loadingSignal = signal<boolean>(false);
  private readonly errorSignal = signal<string | null>(null);

  readonly student = this.studentSignal.asReadonly();
  readonly loading = this.loadingSignal.asReadonly();
  readonly error = this.errorSignal.asReadonly();

  readonly progress = computed(() => this.studentSignal()?.progress);
  readonly recommendedCareers = computed(() => this.studentSignal()?.recommendedCareers || []);
  readonly overallPercentage = computed(() => this.studentSignal()?.progress.overallPercentage ?? 0);

  loadStudentById(id: number): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);

    this.api.getStudentById(id).subscribe({
      next: (student) => {
        this.studentSignal.set(student);
        this.loadingSignal.set(false);
      },
      error: (error) => {
        this.errorSignal.set('Error al cargar el estudiante');
        this.loadingSignal.set(false);
        console.error('Error loading student:', error);
      }
    });
  }

  clearStudent(): void {
    this.studentSignal.set(null);
    this.errorSignal.set(null);
  }
}
