import { Component } from '@angular/core';

@Component({
  selector: 'app-test',
  standalone: true,
  template: `
    <div style="padding: 2rem; font-family: sans-serif;">
      <h1>¡La prueba funciona!</h1>
      <p>El enrutador básico está operativo.</p>
    </div>
  `,
})
export class TestComponent {}
