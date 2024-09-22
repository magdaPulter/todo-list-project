import {
  Component,
  computed,
  inject,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { TaskModel } from '../../models/task-model.model';
import { Observable } from 'rxjs';
import { TaskService } from '../../services/task-service.service';
import { ProjectService } from '../../services/project-service.service';
import { ProjectModel } from '../../models/project-model.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { utils } from '../../utils';
import { toSignal } from '@angular/core/rxjs-interop';

export enum SortParameter {
  PRIORITY = 'priority',
  DATE = 'date',
}
export enum Order {
  ASC = 'Asc',
  DESC = 'Desc',
}
@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss',
})
export class TodoListComponent {
  priorityFlag = utils.priorityFlag;
  taskService = inject(TaskService);
  projectService = inject(ProjectService);

  sortedByList: SortParameter[] = [SortParameter.PRIORITY, SortParameter.DATE];
  orderList: Order[] = [Order.ASC, Order.DESC];

  sortedBy: WritableSignal<string | undefined> = signal(undefined);
  orderBy: WritableSignal<string | undefined> = signal(undefined);

  tasks$: Observable<TaskModel[]> = this.taskService.getAllTasks();
  tasks: Signal<TaskModel[]> = toSignal(this.taskService.getAllTasks(), {
    initialValue: [],
  });
  projects$: Observable<ProjectModel[]> = this.projectService.getProjects();

  sortedTasks: Signal<TaskModel[]> = computed(() => {
    return this.tasks().sort((a: TaskModel, b: TaskModel) => {
      if (this.sortedBy() === 'priority') {
        return this.orderBy() === 'Asc'
          ? a.priority - b.priority
          : b.priority - a.priority;
      } else {
        return this.orderBy() === 'Asc'
          ? utils.dateTime(a.due!.date) - utils.dateTime(b.due!.date)
          : utils.dateTime(b.due!.date) - utils.dateTime(a.due!.date);
      }
    });
  });

  constructor() {}

  onCheck(task: TaskModel) {
    this.taskService.close(task).subscribe();
  }
  onSortBy(sortParameter: string) {
    this.sortedBy.set(sortParameter);
    this.sortedTasks();
  }

  onSort(order: string) {
    this.orderBy.set(order);
    this.sortedTasks();
  }
}
