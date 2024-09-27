import {
  Component,
  computed,
  inject,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { TaskModel } from '../../models/task-model.model';
import { TaskService } from '../../services/task-service.service';
import { ProjectService } from '../../services/project-service.service';
import { ProjectModel } from '../../models/project-model.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { utils } from '../../utils';
import { toSignal } from '@angular/core/rxjs-interop';
import { FilterOptionsModel } from '../../models/filtersOptions-model';

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
  priority = utils.priority;
  taskService = inject(TaskService);
  projectService = inject(ProjectService);

  sortedByList: SortParameter[] = [SortParameter.PRIORITY, SortParameter.DATE];
  orderList: Order[] = [Order.ASC, Order.DESC];

  sortedBy: WritableSignal<string | undefined> = signal(undefined);
  orderBy: WritableSignal<string | undefined> = signal(undefined);

  tasks: Signal<TaskModel[]> = toSignal(this.taskService.getAllTasks(), {
    initialValue: [],
  });
  projects: Signal<ProjectModel[]> = toSignal(
    this.projectService.getProjects(),
    { initialValue: [] }
  );

  filterOptions = signal(utils.filterOptions);

  filteredSortedTasks: Signal<TaskModel[]> = computed(() => {
    return this.tasks()
      .filter((task) => {
        return task.content.toLowerCase().includes(this.filterOptions().search);
      })
      .filter((task) =>
        this.filterOptions().priority === 'Select Priority'
          ? task
          : task.priority.toString() === this.filterOptions().priority
      )
      .filter((task) =>
        this.filterOptions().projectId === 'Select Project'
          ? task
          : task.project_id === this.filterOptions().projectId
      )
      .sort((a: TaskModel, b: TaskModel) => {
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

  onCheck(task: TaskModel) {
    this.taskService.close(task).subscribe();
  }
  onSortBy(sortParameter: string) {
    this.sortedBy.set(sortParameter);
    this.filteredSortedTasks();
  }

  onSort(order: string) {
    this.orderBy.set(order);
    this.filteredSortedTasks();
  }

  onModelChanged($event: keyof FilterOptionsModel, parameter: string) {
    switch (parameter) {
      case 'search':
        this.filterOptions.set({ ...this.filterOptions(), search: $event });
        break;
      case 'priority':
        this.filterOptions.set({ ...this.filterOptions(), priority: $event });
        break;
      case 'projectId':
        this.filterOptions.set({ ...this.filterOptions(), projectId: $event });
        break;
    }
  }
}
