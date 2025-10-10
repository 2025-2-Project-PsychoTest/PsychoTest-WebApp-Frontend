import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';

export interface StudentProfile {
  id: number;
  firstname?: string;
  lastname?: string;
  fullName?: string;
  email: string;
  phone: string;
  age?: number;
  status?: string;
  userType?: string;
  educationLevel?: string;
  interests?: string[];
  academicHistory?: {
    year: number;
    institution: string;
    status: string;
  }[];
  notifications?: {
    email: boolean;
    sms: boolean;
    push: boolean;
  };
  privacySettings?: {
    profileVisible: boolean;
    dataSharing: boolean;
  };
  preferences?: {
    language: string;
    timezone: string;
  }
  profilePicture?: string;
  bio?: string;

  progress?: {
    overallPercentage: number;
    tests: {
      name: string;
      status: string;
      completionDate?: string;
      estimatedTime?: string;
    }[];
  };

  recommendedCareers?: {
    name: string;
    description: string;
    compatibilityPercentage: number;
  }[];
}



@Injectable({
  providedIn: 'root'
})
export class ProfileApiService {
  private http = inject(HttpClient);
  private translate = inject(TranslateService);
  private apiUrl = 'http://localhost:3000';

  /**
   * Retorna el endpoint dependiendo del idioma actual.
   * Ejemplo: students_en o students_es
   */
  private getLangEndpoint(entity: 'students' | 'psychologists'): string {
    const lang = this.translate.currentLang || 'en';
    return `${this.apiUrl}/${entity}_${lang}`;
  }

  getStudentProfile(id: number): Observable<StudentProfile> {
    const url = `${this.getLangEndpoint('students')}/${id}`;
    return this.http.get<StudentProfile>(url);
  }

  getPsychologistProfile(id: number): Observable<any> {
    const url = `${this.getLangEndpoint('psychologists')}/${id}`;
    return this.http.get<any>(url);
  }
}
