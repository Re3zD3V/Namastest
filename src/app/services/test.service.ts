import {
  HttpClient,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Test } from '../models/test';
import { URL_BACK_TESTS } from '../shared/constants/apiEndpoints';

@Injectable({
  providedIn: 'root',
})
export class TestService {

  constructor(private http: HttpClient) {}

  // Create a new Test
  createTest(item: Test): Observable<Test> {
    let result = '{"title":"'+item.title+'","description":"'+item.description + '","author":"/api/users/'+item.author.id;
    
    if (item.catalogs.length > 0) {
      result += '","catalogs":["';
      for (let i=0; i<item.catalogs.length; i++){
        if (i<item.catalogs.length-1){
          result += '"' + '/api/catalogs/'+item.catalogs[i].id.toString()+'",';
        } else {
          result += '/api/catalogs/'+item.catalogs[i].id.toString()+"\"]}";
        }
      }
    } else {
      result += '","catalogs":[]}';
    }
    
    console.log(result);
    return this.http
      .post<Test>(`${environment.baseUrl}${URL_BACK_TESTS}`, result);
  }

  // Get single Test data by ID
  getTest(id): Observable<Test> {
    return this.http
      .get<Test>(`${environment.baseUrl}${URL_BACK_TESTS}/${id}`);
  }

  // Get Tests data
  getTestList(page = 1): Observable<Test> {
    return this.http
      .get<Test>(`${environment.baseUrl}${URL_BACK_TESTS}`);
  }

  // Update Test by id
  updateTest(id, item): Observable<Test> {
    return this.http
      .patch<Test>(`${environment.baseUrl}${URL_BACK_TESTS}/${id}`, {"title":`${item.title}`,"description":`${item.description}`});
  }

  // Delete Test by id
  deleteTest(id) {
    return this.http
      .delete<Test>(
        `${environment.baseUrl}${URL_BACK_TESTS}/${id}`);
  }
}
