import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { config } from 'rxjs';
import { User } from '../../app/data/hero';
import { HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthenticationService {
  constructor(private http: HttpClient) { }

  login(email_id: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'responseType': 'text',
        'Access-Control-Allow-Origin': 'http://localhost:8080',
        'Access-Control-Allow-Methods': "DELETE, POST, GET, OPTIONS",
        'Access-Control-Allow-Headers': 'Content-Type,application/json',
        'Authorization': 'my-auth-token'
      })
    };
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-formurlencoded');
    return this.http.post<User[]>(environment.getUserUrl, { email_id: email_id }, httpOptions).pipe();
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }
}