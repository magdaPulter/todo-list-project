import { Routes } from '@angular/router';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { TaskDetailComponent } from './components/task-detail/task-detail.component';
import { AddTaskComponent } from './components/add-task/add-task.component';

export const routes: Routes = [
  {
    path: '',
    component: TodoListComponent,
  },
  {
    path: 'add-task',
    component: AddTaskComponent,
  },
  {
    path: 'tasks/:id',
    component: TaskDetailComponent,
  },
];
