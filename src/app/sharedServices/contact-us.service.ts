import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ContactUs } from '../data/hero';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactUsService {

  formData: { contactType: '', userId: '', orderId: '', submitDate: '', status: '', assignedTo: '', userEmailId: '', userPhone: '', lastUpdateDate: '', reasonId: '', reasonDesc: '' }

  constructor(private _http: HttpClient) { }

  public insertData(formData: ContactUs): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'responseType': 'text',
        'Access-Control-Allow-Origin': 'http://localhost:8080',
        'Access-Control-Allow-Methods': "DELETE,POST,GET,OPTIONS",
        'Access-Control-Allow-Headers': 'Content-Type :application/json',
        'Authorization': 'my-auth-token'

      })
    };
    return this._http.post<ContactUs>(environment.contactusUrl, formData, httpOptions).pipe();
  }

}
