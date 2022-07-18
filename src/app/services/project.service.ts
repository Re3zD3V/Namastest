import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Project } from '../models/project';
import { URL_BACK_PROJECTS} from '../shared/constants/apiEndpoints';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  constructor(private http: HttpClient) {}

  public registerNewProject(
    project: Project
  ): Observable<Project> {
    return this.http
      .post<Project>(
        `${environment.baseUrl}${URL_BACK_PROJECTS}`,
        {
          name: `${project.name}`,
          description: `${project.description}`,
          author: `/api/users/${project.author.id}`,
        }
      );
  }

  public getProjectById(project: Project): Observable<Project> {
    return this.http
      .get<Project>(`${environment.baseUrl}${URL_BACK_PROJECTS}/${project.id}`);
  }

  public deleteProjectById(project: Project): Observable<Project> {
    return this.http
      .delete<Project>(`${environment.baseUrl}${URL_BACK_PROJECTS}/${project.id}`);
  }
}
