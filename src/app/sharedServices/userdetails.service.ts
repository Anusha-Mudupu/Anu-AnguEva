/*
 *   Copyright (c) 2023 Dmantz Technologies private limited
 *   All rights reserved.
 */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginDetails, UserDetails } from '../data/hero';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class UserdetailsService {
  constructor(private loginservice: LoginService, private _http: HttpClient) { }
  getUserDetails(userId: number) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'responseType': 'text,application/json',
        'Access-Control-Allow-Origin': 'http://localhost:8080',
        'Access-Control-Allow-Methods': "DELETE, POST, GET, OPTIONS",
        'Access-Control-Allow-Headers': 'Content-Type,application/json',
        'Authorization': 'my-auth-token'

      })
    };
    return this._http.get<LoginDetails>(environment.getUserDetailsUrl + userId, httpOptions);
  }

}
