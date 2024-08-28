import { Component, inject } from '@angular/core';
import { TaskModel } from '../../models/task-model.model';
import { Observable } from 'rxjs';
import { utils } from '../../utils';
import { TaskService } from '../../services/task-service.service';
import { ProjectService } from '../../services/project-service.service';
import { ProjectModel } from '../../models/project-model.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss',
})
export class TodoListComponent {
  taskService = inject(TaskService);
  projectService = inject(ProjectService);

  tasks$: Observable<TaskModel[]> = this.taskService.getAllTasks();
  projects$: Observable<ProjectModel[]> = this.projectService.getProjects();

  constructor() {}
}
