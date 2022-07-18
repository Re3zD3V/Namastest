import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Campaign } from '../models/campaign';
import { Project } from '../models/project';
import { URL_BACK_CAMPAIGNS, URL_BACK_PROJECTS } from '../shared/constants/apiEndpoints';

@Injectable({
  providedIn: 'root'
})
export class CampaignService {
  constructor(private http: HttpClient) {}

  public registerNewCampaign(campaign: Campaign): Observable<Campaign> {
    return this.http.post<Campaign>(`${environment.baseUrl}${URL_BACK_CAMPAIGNS}`, JSON.stringify(campaign));
  }

  public getProjectById(id: number): Observable<Project> {
    return this.http.get<Project>(`${environment.baseUrl}${URL_BACK_PROJECTS}/${id}`);
  }

  deleteCampaignById(id: number): Observable<Campaign> {
    return this.http.delete<Campaign>(`${environment.baseUrl}${URL_BACK_CAMPAIGNS}/${id}`);
  }

}
