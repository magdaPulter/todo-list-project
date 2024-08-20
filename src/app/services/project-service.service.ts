import { Injectable } from '@angular/core';
import { ProjectModel } from '../models/project-model.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { servicesUtils } from '../serviceUtils';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  constructor(private _httpClient: HttpClient) {}

  getProjects(): Observable<ProjectModel[]> {
    return this._httpClient.get<ProjectModel[]>(
      `${servicesUtils.url}/projects`,
      {
        headers: servicesUtils.headers,
      }
    );
  }
}
