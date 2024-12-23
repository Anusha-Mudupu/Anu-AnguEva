import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class EmailSubscriptionService {

  constructor(private http: HttpClient) { }


  sendSubscriptionAction(body:any): Observable<any> {
  
    return this.http.post(environment.emailSubscriptionUrl,body);
  }
}
