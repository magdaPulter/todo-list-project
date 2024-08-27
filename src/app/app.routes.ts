import { Routes } from '@angular/router';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { TaskDetailComponent } from './components/task-detail/task-detail.component';

export const routes: Routes = [
  {
    path: '',
    component: TodoListComponent,
  },
  {
    path: 'tasks/:id',
    component: TaskDetailComponent,
  },
];
