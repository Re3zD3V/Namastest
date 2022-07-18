import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Credentials } from '../models/credentials';
import { environment } from 'src/environments/environment';
import { URL_BACK_LOGIN } from '../shared/constants/apiEndpoints';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  // Login with credentials to receive JSON Web Token
  login(username: string, password: string): Observable<Credentials> {
    return this.http.post<Credentials>(`${environment.baseUrl}${URL_BACK_LOGIN}`, JSON.stringify( { username, password } ));
  }
}
