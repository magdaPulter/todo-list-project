import { Component, inject } from '@angular/core';
import { TaskModel } from '../../models/task-model.model';
import { Observable } from 'rxjs';
import { utils } from '../../utils';
import { TaskService } from '../../services/task-service.service';
import { ProjectService } from '../../services/project-service.service';
import { ProjectModel } from '../../models/project-model.model';
import { NgForm, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss',
})
export class TodoListComponent {
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

  onFormSubmitted(form: NgForm) {
    if (form.valid) {
      this.taskService.createTask(this.task).subscribe();
    }
  }
}
