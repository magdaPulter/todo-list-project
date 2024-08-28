import { Component, inject, Input } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { TaskModel } from '../../models/task-model.model';
import { TaskService } from '../../services/task-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { GoBackBtnComponent } from '../go-back-btn/go-back-btn.component';

@Component({
  selector: 'app-task-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, GoBackBtnComponent],
  templateUrl: './task-detail.component.html',
  styleUrl: './task-detail.component.scss',
})
export class TaskDetailComponent {
  taskId!: string;
  taskDetail$: Observable<TaskModel> = of();

  @Input() set id(id: string) {
    this.taskId = id;
    this.taskDetail$ = this.taskService.getTask(id);
  }

  taskService: TaskService = inject(TaskService);
}
