import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { TaskModel } from './models/task-model.model';
import { ProjectModel } from './models/project-model.model';
import { FormsModule, NgForm } from '@angular/forms';

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
  };

  TOKEN: string = '23c109ece8896fe9b8c55fae14c29cdd327373ab';
  headers: HttpHeaders = new HttpHeaders().set(
    `Authorization`,
    `Bearer ${this.TOKEN}`
  );

  getProjects(): Observable<ProjectModel[]> {
    return this._httpClient.get<ProjectModel[]>(
      `https://api.todoist.com/rest/v2/projects`,
      {
        headers: this.headers,
      }
    );
  }
  getTask(): Observable<TaskModel[]> {
    return this._httpClient.get<TaskModel[]>(
      `https://api.todoist.com/rest/v2/tasks`,
      {
        headers: this.headers,
      }
    );
  }
  createTask(task: TaskModel) {
    return this._httpClient.post<TaskModel>(
      `https://api.todoist.com/rest/v2/tasks`,
      task,
      {
        headers: this.headers,
      }
    );
  }

  tasks$: Observable<TaskModel[]> = this.getTask();
  projects$: Observable<ProjectModel[]> = this.getProjects();

  constructor(private _httpClient: HttpClient) {}

  onFormSubmitted(form: NgForm) {
    if (form.valid) {
      this.createTask(this.task).subscribe();
    }
  }
}
