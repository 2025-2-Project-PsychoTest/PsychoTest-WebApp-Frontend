import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Student } from '../domain/model/student.entity';
import { StudentAssembler } from './student-assembler';
import { StudentResource } from './students-response';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StudentDashboardApi {
  private readonly http = inject(HttpClient);
  private readonly assembler = new StudentAssembler();
  private readonly baseUrl = `${environment.serverBasePath}${environment.studentsEndpointPath}`;

  getStudentById(id: number): Observable<Student> {
    return this.http.get<StudentResource>(`${this.baseUrl}/${id}`).pipe(
      map(resource => this.assembler.toEntityFromResource(resource)),
      catchError(this.handleError)
    );
  }

  getAllStudents(): Observable<Student[]> {
    return this.http.get<StudentResource[]>(this.baseUrl).pipe(
      map(resources => resources.map(r => this.assembler.toEntityFromResource(r))),
      catchError(this.handleError)
    );
  }

  private handleError(error: unknown): Observable<never> {
    console.error('Error in StudentDashboardApi:', error);
    throw error;
  }
}
