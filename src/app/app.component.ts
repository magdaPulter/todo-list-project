import { Component, OnInit, SimpleChanges, inject } from '@angular/core';
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
    is_completed: false,
    due: {
      date: '',
    },
  };

  TOKEN: string = '23c109ece8896fe9b8c55fae14c29cdd327373ab';
  headers: HttpHeaders = new HttpHeaders().set(
    `Authorization`,
    `Bearer ${this.TOKEN}`
  );
  url: string = 'https://api.todoist.com/rest/v2';

  minDate() {
    const date = new Date();
    const m =
      date.getMonth() + 1 < 10
        ? `0${date.getMonth() + 1}`
        : date.getMonth() + 1;
    const d = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
    const y = date.getFullYear();

    return `${y}-${m}-${d}`;
  }

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

  constructor(private _httpClient: HttpClient) {
    this.tasks$.subscribe((val) => console.log(val));
  }

  onCheck(task: TaskModel) {
    // this.updateTask(task).subscribe();
  }

  onFormSubmitted(form: NgForm) {
    if (form.valid) {
      // console.log(this.task);
      console.log(this.task);

      this.createTask(this.task).subscribe();
    }
  }
}
