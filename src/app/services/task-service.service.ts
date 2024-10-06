import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { TaskModel } from '../models/task-model.model';
import { servicesUtils } from '../serviceUtils';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private _httpClient: HttpClient) {}

  public refreshListSubject: BehaviorSubject<void> = new BehaviorSubject<void>(
    void 0
  );

  getAllTasks(): Observable<TaskModel[]> {
    return this._httpClient.get<TaskModel[]>(`${servicesUtils.url}/tasks`, {
      headers: servicesUtils.headers,
    });
  }

  getRefreshedTaskList(): Observable<TaskModel[]> {
    return this.refreshListSubject
      .asObservable()
      .pipe(switchMap(() => this.getAllTasks()));
  }

  getTask(taskId: string): Observable<TaskModel> {
    return this._httpClient.get<TaskModel>(
      `${servicesUtils.url}/tasks/${taskId}`,
      {
        headers: servicesUtils.headers,
      }
    );
  }
  createTask(task: TaskModel): Observable<TaskModel> {
    return this._httpClient.post<TaskModel>(
      `${servicesUtils.url}/tasks`,
      task,
      {
        headers: servicesUtils.headers,
      }
    );
  }
  update(task: TaskModel): Observable<TaskModel> {
    return this._httpClient.post<TaskModel>(
      `${servicesUtils.url}/tasks/${task.id}`,
      task,
      {
        headers: servicesUtils.headers,
      }
    );
  }
  close(task: TaskModel): Observable<TaskModel> {
    return this._httpClient.post<TaskModel>(
      `${servicesUtils.url}/tasks/${task.id}/close`,
      task,
      {
        headers: servicesUtils.headers,
      }
    );
  }
}
