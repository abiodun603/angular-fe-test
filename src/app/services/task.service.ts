// src/app/services/task.service.ts
import { Injectable } from '@angular/core';
import { signal } from '@angular/core'; // Import signal from Angular
import { LocalStorageService } from './local-storage.service';
import { TaskProps } from '../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private readonly tasksKey = 'tasks';

  // Creating the signal to hold tasks data
  tasksSignal = signal<TaskProps[]>([]); // Use signal() here to create a signal

  constructor(private localStorageService: LocalStorageService) {
    // Initialize signal with tasks from localStorage
    const tasks = this.localStorageService.getTasks();
    this.tasksSignal.set(tasks); // Setting the initial value of the signal
  }

  addTask(newTask: TaskProps): void {
    const currentTasks = this.tasksSignal();
    const nextId =
      currentTasks.length > 0
        ? Math.max(...currentTasks.map((t) => t.id)) + 1
        : 1;
    const updatedTasks = [...currentTasks, { ...newTask, id: nextId }];

    // Save the updated task list to localStorage
    this.localStorageService.setTasks(updatedTasks);

    // Update the signal with new task list
    this.tasksSignal.set(updatedTasks);
  }

  deleteTask(taskId: number): void {
    const currentTasks = this.tasksSignal();
    const updatedTasks = currentTasks.filter((task) => task.id !== taskId);

    // Save the updated task list to localStorage
    this.localStorageService.setTasks(updatedTasks);

    // Update the signal with the new task list
    this.tasksSignal.set(updatedTasks);
  }

  editTask(updatedTask: TaskProps): void {
    const currentTasks = this.tasksSignal();
    const updatedTasks = currentTasks.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    );

    // Save the updated task list to localStorage
    this.localStorageService.setTasks(updatedTasks);

    // Update the signal with the updated task list
    this.tasksSignal.set(updatedTasks);
  }
}
