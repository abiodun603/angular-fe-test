// src/app/services/local-storage.service.ts
import { Injectable } from '@angular/core';
import { TaskProps } from '../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private readonly tasksKey = 'tasks';

  getTasks(): TaskProps[] {
    const tasks = localStorage.getItem(this.tasksKey);
    return tasks ? JSON.parse(tasks) : [];
  }

  setTasks(tasks: TaskProps[]): void {
    localStorage.setItem(this.tasksKey, JSON.stringify(tasks));
  }
}
