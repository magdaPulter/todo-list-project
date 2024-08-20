import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { TaskModel } from './models/task-model.model';
import { ProjectModel } from './models/project-model.model';
import { FormsModule, NgForm } from '@angular/forms';
import { utils } from './utils';
import { TaskService } from './services/task-service.service';
import { ProjectService } from './services/project-service.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  task: TaskModel = {
    content: '',
    project_id: '',
    id: '',
    description: '',
    is_completed: false,
    due_date: '',
    due: {
      date: '',
    },
  };

  taskService = inject(TaskService);
  projectService = inject(ProjectService);
  minDate = utils.minDate();

  tasks$: Observable<TaskModel[]> = this.taskService.getTask();
  projects$: Observable<ProjectModel[]> = this.projectService.getProjects();

  constructor() {}

  onCheck(task: TaskModel) {}

  onFormSubmitted(form: NgForm) {
    if (form.valid) {
      this.taskService.createTask(this.task).subscribe();
    }
  }
}
