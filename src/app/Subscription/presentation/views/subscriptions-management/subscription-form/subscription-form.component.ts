import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';


import { Subscription } from '../../../../domain/model/subscription.entity';
import { PlanSelectorComponent } from '../../../components/plan-selector/plan-selector.component';

export interface Plan {
  id: number;
  name: string;
}

@Component({
  selector: 'app-subscription-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSlideToggleModule,
    PlanSelectorComponent,
  ],
  templateUrl: './subscription-form.component.html',
  styleUrls: ['./subscription-form.component.css']
})
export class SubscriptionFormComponent implements OnInit, OnChanges {


  @Input() subscription: Subscription | null = null;


  @Input() plans: Plan[] = [];


  @Output() save = new EventEmitter<Partial<Subscription>>();

  form!: FormGroup;
  isEditMode = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['subscription'] && this.subscription) {
      this.isEditMode = true;
      this.form?.patchValue(this.subscription);
    }
  }


  private initForm(): void {
    this.form = this.fb.group({
      id: [null],
      userId: [null, Validators.required],
      planId: [null, Validators.required],
      startDate: [new Date(), Validators.required],
      endDate: [null],
      isActive: [true, Validators.required],
    });
  }


  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.save.emit(this.form.value);

    if (!this.isEditMode) {
      this.form.reset({
        startDate: new Date(),
        isActive: true,
      });
    }
  }
}
