import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
// Se importa MatSelectChange para tipar correctamente el evento del selector
import { MatSelectChange, MatSelectModule } from '@angular/material/select';

// Interfaz para definir la estructura de un Plan.
export interface Plan {
  id: number;
  name: string;
}

@Component({
  selector: 'app-plan-selector',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule
  ],
  templateUrl: './plan-selector.component.html',
  styleUrls: ['./plan-selector.component.css'],
  providers: [
    {
      // Esto permite que el componente se integre con los formularios de Angular.
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PlanSelectorComponent),
      multi: true
    }
  ]
})
export class PlanSelectorComponent implements ControlValueAccessor {

  /**
   * Recibe la lista de planes disponibles para mostrar en el selector.
   */
  @Input() plans: Plan[] = [];

  /**
   * Un @Input opcional para la etiqueta del campo, haciéndolo más reutilizable.
   */
  @Input() label: string = 'Plan';

  // --- Implementación de ControlValueAccessor ---

  value: number | null = null;
  isDisabled: boolean = false;

  // Funciones que Angular nos pasará para notificar cambios.
  onChange: (value: number | null) => void = () => {};
  onTouched: () => void = () => {};

  /**
   * Escribe un nuevo valor en el elemento. Angular llama a este método.
   */
  writeValue(value: number | null): void {
    this.value = value;
  }

  /**
   * Registra una función de callback que se llama cuando el valor del control cambia.
   */
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  /**
   * Registra una función de callback que se llama cuando el control se "toca" (pierde el foco).
   */
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  /**
   * Se llama cuando el estado de deshabilitado del control cambia.
   */
  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  /**
   * Se ejecuta cuando el usuario selecciona una opción en el HTML.
   * Notifica a Angular sobre el nuevo valor.
   * @param event - El evento de cambio de selección de MatSelect.
   */
  onSelectionChange(event: MatSelectChange): void {
    const planId = event.value as number | null;
    this.value = planId;
    this.onChange(this.value); // Notifica a Angular del cambio
    this.onTouched();          // Marca el control como "tocado"
  }
}

