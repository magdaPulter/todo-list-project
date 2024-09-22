import { Component, inject } from '@angular/core';
import { TaskModel } from '../../models/task-model.model';
import { TaskService } from '../../services/task-service.service';
import { NgForm, FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { ProjectModel } from '../../models/project-model.model';
import { ProjectService } from '../../services/project-service.service';
import { utils } from '../../utils';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { GoBackBtnComponent } from '../go-back-btn/go-back-btn.component';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule, GoBackBtnComponent],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.scss',
})
export class AddTaskComponent {
  task: TaskModel = utils.task;
  priority = utils.priority;
  minDate = utils.minDate();

  taskService = inject(TaskService);
  projectService = inject(ProjectService);

  projects$: Observable<ProjectModel[]> = this.projectService.getProjects();
  router = inject(Router);

  onFormSubmitted(form: NgForm) {
    if (form.valid) {
      this.taskService
        .createTask(this.task)
        .subscribe(() => this.router.navigateByUrl('/'));
    }
  }
}
