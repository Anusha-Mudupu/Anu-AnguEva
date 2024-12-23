import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserDetails } from '../data/hero';

@Injectable({
  providedIn: 'root'
})
export class ViewOrdersService {
  constructor(private _http: HttpClient) { }
  getUserDetails(userEmail: string) {
    console.log("entered into getUserDetails(.) of view-orders.service.ts file ");
    console.log(" value of userEmail is ", userEmail);
    const params = new HttpParams({ fromObject: { email_id: userEmail } });
    var userType = localStorage.getItem("userType");
    if (userType === "FACEBOOK" || userType === "GOOGLE") {
      console.log("environment.getUserDetailsByEmail is. ", environment.getUserDetailsByEmail + userEmail);
      return this._http.get<any>(environment.getUserDetailsByEmail + userEmail);
    }
    else {
      userEmail = userEmail.slice(1);
      userEmail = userEmail.slice(0, userEmail.length - 1);
      console.log("environment.getUserDetailsByEmail is. ", environment.getUserDetailsByEmail + userEmail);
      return this._http.get<any>(environment.getUserDetailsByEmail + userEmail);
    }
  }
}
