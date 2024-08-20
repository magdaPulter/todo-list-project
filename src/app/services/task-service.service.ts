import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TaskModel } from '../models/task-model.model';
import { servicesUtils } from '../serviceUtils';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private _httpClient: HttpClient) {}

  getTask(): Observable<TaskModel[]> {
    return this._httpClient.get<TaskModel[]>(`${servicesUtils.url}/tasks`, {
      headers: servicesUtils.headers,
    });
  }
  createTask(task: TaskModel) {
    return this._httpClient.post<TaskModel>(
      `${servicesUtils.url}/tasks`,
      task,
      {
        headers: servicesUtils.headers,
      }
    );
  }
}
