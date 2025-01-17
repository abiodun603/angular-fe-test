import { Component, effect, signal } from '@angular/core';
import { FilterComponent } from '../filter/filter.component';
import { TaskListComponent } from '../task-list/task-list.component';
import type { TaskGroupProps, TaskProps } from '../../models/task.model';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { TaskService } from '../../services/task.service';
import { TaskFormComponent } from '../task-form/task-form.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-task-board',
  imports: [
    CommonModule,
    MatButtonModule,
    FilterComponent,
    TaskListComponent,
    MatDialogModule,
  ],
  templateUrl: './task-board.component.html',
  styleUrl: './task-board.component.scss',
})
export class TaskBoardComponent {
  tasks: TaskProps[] = [];
  // private readonly taskService = inject(TaskService);
  // private readonly dialog = inject(MatDialog);
  // taskService = inject(TaskService);
  // dialog = inject(MatDialog);
  // taskItems = signal(this.); // taskGroups = signal<Array<TaskGroupProps>>([]);
  selectedStatus = signal<string | null>('All');
  selectedPriority = signal<string>('All');
  // tasks = this.taskService.tasks;
  taskGroups: TaskGroupProps[] = [
    { status: 'To Do', tasks: [] as TaskProps[] },
    { status: 'In Progress', tasks: [] as TaskProps[] },
    { status: 'Completed', tasks: [] as TaskProps[] },
  ];

  constructor(private taskService: TaskService, private dialog: MatDialog) {
    effect(() => {
      const tasks = this.taskService.tasksSignal();
      const selectedStatus = this.selectedStatus();
      const selectedPriority = this.selectedPriority();

      const filteredByStatus =
        selectedStatus === 'All'
          ? tasks
          : tasks.filter((task) => task.status === selectedStatus);

      const filteredTasks =
        selectedPriority === 'All'
          ? filteredByStatus
          : filteredByStatus.filter(
              (task) => task.priority === selectedPriority
            );

      this.updateTaskGroups(filteredTasks);
    });
  }

  private updateTaskGroups(tasks: TaskProps[]): void {
    this.taskGroups.forEach((group) => {
      group.tasks = tasks.filter((task) => task.status === group.status);
    });
  }

  onStatusChange(selectedStatus: string | null): void {
    this.selectedStatus.set(selectedStatus);
    // this.filterTasks();
  }

  onPriorityChange(selectedPriority: string): void {
    this.selectedPriority.set(selectedPriority);
    // this.filterTasks();
  }

  deleteTask(taskId: number): void {
    console.log(taskId);
    this.taskService.deleteTask(taskId);
  }

  openTaskDialog(task: TaskProps | null = null): void {
    console.log('You clicked me');
    const dialogRef = this.dialog.open(TaskFormComponent, {
      data: task,
      width: '600px',
    });

    dialogRef.afterClosed().subscribe((result: TaskProps | undefined) => {
      if (result) {
        console.log(result);
        if (result.id) {
          // console.log('edit me');
          this.taskService.editTask(result);
        } else {
          this.taskService.addTask(result);
          // console.log('add me');
        }
      }
    });
  }
}

// groupTasksByStatus(): void {
//   const tasks = this.taskItems();
//   this.taskGroups.forEach((group) => {
//     group.tasks = tasks.filter((task) => task.status === group.status); // Group tasks by status
//   });
// }

// filterTasks(): void {
//   const selectedStatus = this.selectedStatus();
//   const selectedPriority = this.selectedPriority();
//   const tasks = this.taskItems(); // Use the signal function to access the latest value

//   const filteredByStatus =
//     selectedStatus === 'All'
//       ? tasks
//       : tasks.filter((task) => task.status === selectedStatus);

//   const filteredTasks = filteredByStatus.filter((task) =>
//     selectedPriority === 'All' ? true : task.priority === selectedPriority
//   );

//   this.taskGroups.forEach((group) => {
//     group.tasks = filteredTasks.filter((task) => task.status === group.status);
//   });
// }
