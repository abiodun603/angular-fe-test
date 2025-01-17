import { Component, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import {
  LucideAngularModule,
  Clock,
  Circle,
  Clock6,
  Clock12,
  SignalLow,
  SignalMedium,
  SignalHigh,
  Signal,
  Edit,
  Trash,
} from 'lucide-angular';
import type { TaskGroupProps, TaskProps } from '../../models/task.model';

@Component({
  selector: 'app-task-list',
  imports: [CommonModule, MatButtonModule, LucideAngularModule],
  standalone: true,
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent {
  readonly Clock6 = Clock6;
  readonly Clock12 = Clock12;
  readonly Circle = Circle;
  readonly Low = SignalLow;
  readonly Medium = SignalMedium;
  readonly High = Signal;
  readonly Edit = Edit;
  readonly Trash = Trash;

  @Input() taskGroups: TaskGroupProps[] = [];
  @Input() deleteTask!: (taskId: number) => void;
  @Input() editTask!: (task: TaskProps) => void;
  @Input() openTaskDialog!: (task: TaskProps | null) => void;

  getIcon(status: string): any {
    switch (status) {
      case 'To Do':
        return this.Circle;
      case 'In Progress':
        return this.Clock6;
      case 'Completed':
        return this.Clock12;
      default:
        return this.Circle; // Default icon
    }
  }

  getPriority(status: string): any {
    switch (status) {
      case 'Low':
        return this.Low;
      case 'Medium':
        return this.Medium;
      case 'High':
        return this.High;
      default:
        return this.Low; // Default icon
    }
  }

  get areAllGroupsEmpty(): boolean {
    return this.taskGroups.every((group) => group.tasks.length === 0);
  }
  constructor() {}
}
