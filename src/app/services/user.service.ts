import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { Observable} from 'rxjs';
import { environment } from 'src/environments/environment';
import { URL_BACK_USERS, URL_BACK_USER_ID } from '../shared/constants/apiEndpoints';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }

  // Get single user data by ID
  getUser(id): Observable<User> {
    return this.http.get<User>(`${environment.baseUrl}${URL_BACK_USERS}/${id}`)
  }

  // Get single user data by Email
  getUserIdByEmail(email): Observable<number> {
    return this.http.get<number>(`${environment.baseUrl}${URL_BACK_USER_ID}${email}`)
  }

  // Get users data
  getUsersList(page=1): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}${URL_BACK_USERS}`)
  }
    
  // Create a new user
  createUser(item): Observable<User> {
    return this.http
      .post<User>(`${environment.baseUrl}${URL_BACK_USERS}`, JSON.stringify(item))
  }

   // Update user by id
  updateUser(id, item): Observable<User> {
    return this.http
      .patch<User>(`${environment.baseUrl}${URL_BACK_USERS}/${id}`, JSON.stringify(item))
  }

  // Delete user by id
  deleteUser(id) {
    return this.http
      .delete<User>(`${environment.baseUrl}${URL_BACK_USERS}/${id}`)
      
  }
}
