import { Component, inject, Input } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { TaskModel } from '../../models/task-model.model';
import { TaskService } from '../../services/task-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { GoBackBtnComponent } from '../go-back-btn/go-back-btn.component';
import { utils } from '../../utils';
import { ProjectService } from '../../services/project-service.service';
import { ProjectModel } from '../../models/project-model.model';

@Component({
  selector: 'app-task-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, GoBackBtnComponent],
  templateUrl: './task-detail.component.html',
  styleUrl: './task-detail.component.scss',
})
export class TaskDetailComponent {
  // task: TaskModel = utils.task;
  taskId!: string;
  taskDetail$: Observable<TaskModel> = of();

  taskService: TaskService = inject(TaskService);
  @Input() set id(id: string) {
    this.taskId = id;
    this.taskDetail$ = this.taskService.getTask(id);
    this.taskService.getTask(id);
  }
  projectService = inject(ProjectService);
  projects$: Observable<ProjectModel[]> = this.projectService.getProjects();
}
