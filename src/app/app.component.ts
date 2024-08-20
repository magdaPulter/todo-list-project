import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { TaskModel } from './models/task-model.model';
import { ProjectModel } from './models/project-model.model';
import { FormsModule, NgForm } from '@angular/forms';
import { utils } from './utils';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  task: TaskModel = {
    content: '',
    project_id: '',
    id: '',
    description: '',
    is_completed: false,
    due_date: '',
  };

  TOKEN: string = '23c109ece8896fe9b8c55fae14c29cdd327373ab';
  headers: HttpHeaders = new HttpHeaders().set(
    `Authorization`,
    `Bearer ${this.TOKEN}`
  );
  url: string = 'https://api.todoist.com/rest/v2';

  minDate = utils.minDate();

  getProjects(): Observable<ProjectModel[]> {
    return this._httpClient.get<ProjectModel[]>(`${this.url}/projects`, {
      headers: this.headers,
    });
  }
  getTask(): Observable<TaskModel[]> {
    return this._httpClient.get<TaskModel[]>(`${this.url}/tasks`, {
      headers: this.headers,
    });
  }
  createTask(task: TaskModel) {
    return this._httpClient.post<TaskModel>(`${this.url}/tasks`, task, {
      headers: this.headers,
    });
  }
  updateTask(task: TaskModel) {
    return this._httpClient.patch<TaskModel>(
      `${this.url}/tasks/${task.id}`,
      task,
      {
        headers: this.headers,
      }
    );
  }

  tasks$: Observable<TaskModel[]> = this.getTask();
  projects$: Observable<ProjectModel[]> = this.getProjects();

  constructor(private _httpClient: HttpClient) {}

  onCheck(task: TaskModel) {}

  onFormSubmitted(form: NgForm) {
    if (form.valid) {
      this.createTask(this.task).subscribe();
    }
  }
}
