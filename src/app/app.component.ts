import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { TaskModel } from './models/task-model.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  TOKEN: string = '23c109ece8896fe9b8c55fae14c29cdd327373ab';

  getTask(): Observable<TaskModel[]> {
    const headers: HttpHeaders = new HttpHeaders().set(
      `Authorization`,
      `Bearer ${this.TOKEN}`
    );

    return this._httpClient.get<TaskModel[]>(
      `https://api.todoist.com/rest/v2/tasks`,
      {
        headers: headers,
      }
    );
  }

  tasks$: Observable<TaskModel[]> = this.getTask();

  constructor(private _httpClient: HttpClient) {}
}
