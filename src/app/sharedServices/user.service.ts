/*
 *   Copyright (c) 2023 Dmantz Technologies private limited
 *   All rights reserved.
 */
import { Injectable } from '@angular/core';
import { User, Register } from '../../app/data/hero';
import { config } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
@Injectable()
export class UserService {
  constructor(private http: HttpClient) { }
  register(user: User) {
    console.log("value of user is.", user);
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
    console.log(environment.Registration_Url, user, httpOptions);
    return this.http.post<Register>(environment.Registration_Url, user, httpOptions).pipe();
  }
  verificationEmail(user: User) {
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
    console.log(this.http.post(environment.verificationEmail_Url, user, httpOptions).pipe());
    return this.http.post<User[]>(environment.verificationEmail_Url, user, httpOptions).pipe();
  }

  verifyOTP(Otp, user: User) {
    // console.log(inputotp1);
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
    console.log(this.http.post(environment.verifyOTP_Url, httpOptions).pipe());
    return this.http.post<Register>(environment.verifyOTP_Url+ Otp, user, httpOptions).pipe();
  }
  validateOtp(enterotpval) {
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
    console.log("environment.validateOtp_Url + enterotpval, httpOptions is. ", environment.validateOtp_Url + enterotpval, httpOptions);
    return this.http.get<Register>(environment.validateOtp_Url + enterotpval, httpOptions).pipe();
  }
  valAndRegUser(Otp, user: User) {
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
    console.log("environment.validateOTPandRegUserUrl + Otp, user, httpOptions is. ", environment.validateOTPandRegUserUrl + Otp, user, httpOptions);
    return this.http.post<Register>(environment.validateOTPandRegUserUrl + Otp, user, httpOptions).pipe();
  }

  saveUserProfile(user: User) {
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
    console.log("user values are. ", user)
    console.log(environment.saveUserProfileUrl, user, httpOptions);
    return this.http.post<Register>(environment.saveUserProfileUrl, user, httpOptions).pipe();
  }
  getUserProfile(userId: number) {
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
    console.log(environment.getProductFromCartUrl + userId);
    return this.http.get<any>(environment.getUserProfileUrl + userId);
  }

}
