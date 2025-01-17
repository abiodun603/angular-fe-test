import { Component, Inject, inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { TaskProps } from '../../models/task.model';

@Component({
  selector: 'app-task-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
  ],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss',
})
export class TaskFormComponent implements OnInit {
  // @Input() task: TaskProps | null = null;

  // dialogRef = inject(MatDialogRef<TaskFormComponent>);

  taskForm: FormGroup;
  fb = inject(FormBuilder);

  constructor(
    private dialogRef: MatDialogRef<TaskFormComponent>,
    @Inject(MAT_DIALOG_DATA) public task: TaskProps | null
  ) {
    this.taskForm = this.fb.group({
      id: [task?.id || null],
      title: ['', Validators.required],
      description: ['', Validators.required],
      dueDate: ['', Validators.required],
      priority: ['', Validators.required],
      status: ['', Validators.required],
    });

    if (this.task) {
      this.taskForm.patchValue(this.task);
    }
  }

  ngOnInit(): void {
    if (this.task) {
      // Pre-fill the form with the task's current values
      this.taskForm.patchValue(this.task);
    }
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      this.dialogRef.close(this.taskForm.value);
    }
  }
}
