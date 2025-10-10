import { Component, signal } from '@angular/core'; // <-- 1. Añade 'signal' aquí
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  protected readonly title = signal('PsychoTest-202502');
}
