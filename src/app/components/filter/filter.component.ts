import { Component, EventEmitter, Input, Output, signal } from '@angular/core';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TaskProps } from '../../models/task.model';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-filter',
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss',
})
export class FilterComponent {
  // selectedStatus = signal<string | null>('All');
  // statusControl = new FormControl(this.selectedStatus());
  // priorityControl = new FormControl('All');

  @Input() selectedStatus: string | null = 'All';
  @Input() selectedPriority: string = 'All';
  @Input() openTaskDialog!: (task: TaskProps | null) => void;

  @Output() statusChange = new EventEmitter<string | null>();
  @Output() priorityChange = new EventEmitter<string>();

  statusControl = new FormControl<string | null>(this.selectedStatus);
  priorityControl = new FormControl<string>(this.selectedPriority);

  constructor() {
    this.statusControl.valueChanges.subscribe((value) => {
      this.statusChange.emit(value);
    });

    this.priorityControl.valueChanges.subscribe((value) => {
      if (value) this.priorityChange.emit(value);
    });
  }
}
