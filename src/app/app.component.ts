import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TaskBoardComponent } from './components/task-board/task-board.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TaskBoardComponent],
  templateUrl: './app.component.html',
  styles: [
    `
      .container {
        width: 1000px;
        margin: 50px auto;
      }

      h1 {
        margin-bottom: 1.5rem;
      }
    `,
  ],
})
export class AppComponent {
  title = 'Task Manager';
}
