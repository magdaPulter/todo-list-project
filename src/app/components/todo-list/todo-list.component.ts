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
import { EditParameter, Order, SortParameter, utils } from '../../utils';
import { toSignal } from '@angular/core/rxjs-interop';
import { EditModeModel } from '../../models/edit-model.model';
import { FilterModel } from '../../models/filter-model';

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
  minDate = utils.minDate();
  task = utils.task;
  taskService = inject(TaskService);
  projectService = inject(ProjectService);

  sortedByList: SortParameter[] = [SortParameter.PRIORITY, SortParameter.DATE];
  orderList: Order[] = [Order.ASC, Order.DESC];

  sortedBy: WritableSignal<string | undefined> = signal(undefined);
  orderBy: WritableSignal<string | undefined> = signal(undefined);

  taskSelected: WritableSignal<TaskModel | null> = signal(null);

  tasks: Signal<TaskModel[]> = toSignal(this.taskService.getAllTasks(), {
    initialValue: [],
  });
  projects: Signal<ProjectModel[]> = toSignal(
    this.projectService.getProjects(),
    { initialValue: [] }
  );

  editMode: WritableSignal<EditModeModel> = signal(utils.editParameters);

  readonly filterOptionsObjArr: FilterModel[] = [
    { label: 'search', value: signal('') },
    { label: 'priority', value: signal('All Priorities') },
    { label: 'project', value: signal('All Projects') },
  ];
  filterOptions: Signal<FilterModel[]> = signal(this.filterOptionsObjArr);

  filteredSortedTasks: Signal<TaskModel[]> = computed(() => {
    return this.tasks()
      .filter((task) => {
        return task.content.toLowerCase().includes(
          this.filterOptions()
            .filter((filterOption) => filterOption.label === 'search')[0]
            .value()
        );
      })
      .filter((task) =>
        this.filterOptions().find((filterOption) =>
          filterOption.value() === 'All Priorities'
            ? task
            : filterOption.value() === task.priority.toString()
        )
      )
      .filter((task) =>
        this.filterOptions().find((filterOption) =>
          filterOption.value() === 'All Projects'
            ? task
            : filterOption.value() === task.project_id
        )
      )
      .sort((a: TaskModel, b: TaskModel) => {
        if (this.sortedBy() === 'due_date' && a.due && b.due) {
          return this.orderBy() === 'Asc'
            ? utils.dateTime(a.due.date) - utils.dateTime(b.due.date)
            : utils.dateTime(b.due.date) - utils.dateTime(a.due.date);
        } else {
          return this.orderBy() === 'Asc'
            ? a.priority - b.priority
            : b.priority - a.priority;
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

  onTaskSelected(task: TaskModel) {
    this.editMode.set(utils.editParameters);
    return this.taskSelected() === null
      ? this.taskSelected.set(task)
      : this.taskSelected.set(null);
  }

  onLiveEdit(parameter: string) {
    switch (parameter) {
      case EditParameter.CONTENT:
        this.editMode.set({ ...this.editMode(), content: true });
        break;
      case EditParameter.DESCRIPTION:
        this.editMode.set({ ...this.editMode(), description: true });
        break;
      case EditParameter.DUE_DATE:
        this.editMode.set({ ...this.editMode(), due_date: true });
        break;
      case EditParameter.PRIORITY:
        this.editMode.set({ ...this.editMode(), priority: true });
        break;
    }
  }
  onTaskUpdated(task: TaskModel) {
    this.taskService.update(task).subscribe(() => {
      this.taskSelected.set(null);
    });
  }
  onLiveEditCancel() {
    this.taskSelected.set(null);
  }
}
