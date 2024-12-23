/*
 *   Copyright (c) 2023 Dmantz Technologies private limited
 *   All rights reserved.
 */
import { Injectable } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { FBUser, GoogleUser, LoginDetails, Order, User } from 'src/app/data/hero';

import { Observable } from 'rxjs';
const token = 'TOKEN';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private loginDetails: LoginDetails[];
  private resetPassword: { emailId: string, password: string };
  private order: Order;

  constructor(private _http: HttpClient) { }
  postData(credentials, type) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'responseType': 'text',
        'Access-Control-Allow-Origin': 'http://localhost:8089',
        'Access-Control-Allow-Methods': "DELETE, POST, GET, OPTIONS",
        'Access-Control-Allow-Headers': 'Content-Type,application/json',
        'Authorization': 'my-auth-token'

      })
    }
    return new Promise((resolve, reject) => {

      this._http.post(environment.apiUrl + type, credentials, httpOptions)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });

  }

  resetPasswordInit(resetPassword) {
    console.log(resetPassword);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'responseType': 'text',
        'Access-Control-Allow-Origin': 'http://localhost:8089',
        'Access-Control-Allow-Methods': "DELETE, POST, GET, OPTIONS",
        'Access-Control-Allow-Headers': 'Content-Type,application/json',
        'Authorization': 'my-auth-token'

      })
    }
    return this._http.post(environment.resetPasswordUrl, resetPassword, httpOptions).pipe();
  }
  sendResetPwdLink(resetPassword: any) {
    console.log(resetPassword);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'responseType': 'text',
        'Access-Control-Allow-Origin': 'http://localhost:8089',
        'Access-Control-Allow-Methods': "DELETE, POST, GET, OPTIONS",
        'Access-Control-Allow-Headers': 'Content-Type,application/json',
        'Authorization': 'my-auth-token'

      })
    }
    return this._http.post(environment.resetPasswordLinkUrl + resetPassword, httpOptions).pipe();
  }
  sendOTP(resetPassword: any) {
    console.log(resetPassword);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'responseType': 'text',
        'Access-Control-Allow-Origin': 'http://localhost:8089',
        'Access-Control-Allow-Methods': "DELETE, POST, GET, OPTIONS",
        'Access-Control-Allow-Headers': 'Content-Type,application/json',
        'Authorization': 'my-auth-token'

      })
    }
    return this._http.post(environment.resetPasswordOTPUrl + resetPassword, httpOptions).pipe();
  }
  getLoginStatus(user: User) {
    console.log(user);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'responseType': 'text/plain',
        'Access-Control-Allow-Origin': 'http://localhost:8080',
        'Access-Control-Allow-Methods': "DELETE, POST, GET, OPTIONS",
        'Access-Control-Allow-Headers': 'Content-Type,application/json',
        'Authorization': 'my-auth-token'

      })
    }
    return this._http.post<LoginDetails>(environment.getUserUrl, user, httpOptions).pipe();
  }
  FBLogin(fbUser: FBUser) {
    console.log("FaceBook user values are. ", fbUser);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'responseType': 'text/plain',
        'Access-Control-Allow-Origin': 'http://localhost:8080',
        'Access-Control-Allow-Methods': "DELETE, POST, GET, OPTIONS",
        'Access-Control-Allow-Headers': 'Content-Type,application/json',
        'Authorization': 'my-auth-token'

      })
    }
    return this._http.post<any>(environment.FBLoginUrl, fbUser, httpOptions).pipe();
  }
  GoogleLogin(googleUser: GoogleUser) {
    console.log("Google user values are. ", googleUser);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'responseType': 'text/plain',
        'Access-Control-Allow-Origin': 'http://localhost:8080',
        'Access-Control-Allow-Methods': "DELETE, POST, GET, OPTIONS",
        'Access-Control-Allow-Headers': 'Content-Type,application/json',
        'Authorization': 'my-auth-token'

      })
    }
    return this._http.post<any>(environment.GoogleLoginUrl, googleUser, httpOptions).pipe();
  }
  CheckEmail(emailId: string): Observable<any> {
    console.log(emailId);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'responseType': 'text/plain',
        'Access-Control-Allow-Origin': 'http://localhost:8080',
        'Access-Control-Allow-Methods': "DELETE, POST, GET, OPTIONS",
        'Access-Control-Allow-Headers': 'Content-Type,application/json',
        'Authorization': 'my-auth-token'

      })
    }
    return this._http.post(environment.checkUserEmailUrl, emailId, httpOptions).pipe();
  }
  isLogged() {
    return localStorage.getItem(token) != null;
  }
  logout(): void {
    localStorage.setItem('isLoggedIn', "false");
    localStorage.removeItem('token');
    console.log("entered into logout");
  }

}
