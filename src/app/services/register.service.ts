import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../pages/user';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }

  baseUrl = 'http://localhost:58314/Account/';
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
    withCredentials: true,
  };


  UserLogin(log: User): Observable<User> {
    return this.http.post<User>(this.baseUrl + 'Login', log, this.headers).pipe();
  }
}
