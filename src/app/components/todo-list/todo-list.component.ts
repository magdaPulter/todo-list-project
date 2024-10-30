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
import { FilterModel } from '../../models/filter-model';
import { EditModel } from '../../models/edit.model';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss',
})
export class TodoListComponent {
  public priorityFlag = utils.priorityFlag;
  public priorityNumber = utils.priority;
  public minDate = utils.minDate();
  public task = utils.task;

  public content = EditParameter.CONTENT;
  public description = EditParameter.DESCRIPTION;
  public due_date = EditParameter.DUE_DATE;
  public priority = EditParameter.PRIORITY;

  readonly taskService = inject(TaskService);
  readonly projectService = inject(ProjectService);

  public sortedByList: SortParameter[] = [
    SortParameter.PRIORITY,
    SortParameter.DATE,
  ];
  public orderList: Order[] = [Order.ASC, Order.DESC];

  readonly sortedBy: WritableSignal<string | undefined> = signal(undefined);
  readonly orderBy: WritableSignal<string | undefined> = signal(undefined);

  readonly taskSelected: WritableSignal<TaskModel | null> = signal(null);
  readonly taskCompletedId: WritableSignal<string> = signal('');

  readonly tasks: Signal<TaskModel[]> = toSignal(
    this.taskService.getRefreshedTaskList(),
    {
      initialValue: [],
    }
  );
  readonly projects: Signal<ProjectModel[]> = toSignal(
    this.projectService.getProjects(),
    { initialValue: [] }
  );

  readonly editMode: WritableSignal<EditModel> = signal(utils.editParameters);

  readonly filterOptionsObjArr: FilterModel[] = [
    { label: 'search', value: signal('') },
    { label: 'priority', value: signal('All Priorities') },
    { label: 'project', value: signal('All Projects') },
  ];
  readonly filterOptions: Signal<FilterModel[]> = signal(
    this.filterOptionsObjArr
  );

  readonly filteredSortedTasks: Signal<TaskModel[]> = computed(() => {
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
  private getCompletedTask(): TaskModel {
    return this.filteredSortedTasks().filter(
      (task) => task.id === this.taskCompletedId()
    )[0];
  }

  onCheck(task: TaskModel) {
    this.taskCompletedId.set(task.id);
  }
  onModalCanceled() {
    this.taskService
      .update(this.getCompletedTask())
      .subscribe(() => this.taskService.refreshListSubject.next());
  }
  onModalConfimed() {
    this.taskService
      .close(this.getCompletedTask())
      .subscribe(() => this.taskService.refreshListSubject.next());
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

  onLiveEdit(parameter: EditParameter) {
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
