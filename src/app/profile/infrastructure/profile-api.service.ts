import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';


export interface StudentProfile {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  age: number;
  educationLevel?: string;
  interests?: string[];
  academicHistory?: { year: number; institution: string; status: string }[];
  notifications?: { email: boolean; sms: boolean; push: boolean };
  privacySettings?: { profileVisible: boolean; dataSharing: boolean };
  preferences?: { language: string; timezone: string };
  profilePicture?: string;
  bio?: string;
  status?: string;
  userType?: string;
}




@Injectable({
  providedIn: 'root'
})
export class ProfileApiService {
  private http = inject(HttpClient);
  private translate = inject(TranslateService);
  private apiUrl = 'http://localhost:3000';

  /**

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
