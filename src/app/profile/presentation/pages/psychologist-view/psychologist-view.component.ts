import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-psychologist-view',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './psychologist-view.component.html',
  styleUrls: ['./psychologist-view.component.css']
})
export class PsychologistViewComponent implements OnInit {
  private http = inject(HttpClient);
  private translate = inject(TranslateService);

  psychologist: any = null;
  loading = true;
  error = false;

 ngOnInit() {
   this.loadPsychologist();

   // Escucha cambios de idioma, pero evita llamadas duplicadas
   this.translate.onLangChange
     .pipe(debounceTime(300)) // espera 300ms antes de volver a cargar
     .subscribe(() => {
       this.loadPsychologist();
     });
 }

  loadPsychologist() {
    this.loading = true;
    this.error = false;

    const lang = this.translate.currentLang || 'en';
    const endpoint = lang === 'es' ? 'psychologists_es' : 'psychologists_en';
    const url = `http://localhost:3000/${endpoint}/1`; // puedes cambiar el ID del psicólogo aquí

     console.log('Idioma actual:', lang);
     console.log('Solicitando psicólogo desde:', url);

     this.http.get(url).subscribe({
        next: (data) => {
          console.log('Psicólogo cargado:', data);
          this.psychologist = data;
          this.loading = false;
        },
      error: (err) => {
        console.error('Error al cargar el psicólogo:', err);
        this.error = true;
        this.loading = false;
      }
    });
  }
}
