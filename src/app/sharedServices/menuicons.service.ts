/*
 *   Copyright (c) 2024 Dmantz Technologies private limited
 *   All rights reserved.
 */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MenuIconsDetails } from '../data/hero';

@Injectable({
  providedIn: 'root'
})
export class MenuiconsService {

  constructor(private http: HttpClient) { }

  getDeals(): Observable<any> {
    return this.http.get<any>('../../assets/data/menuicons.json').pipe();
  }
  getMenuIconDetails(catalogId): Observable<any[]> {
    console.log("catalogId", catalogId);
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
    };
    return this.http.post<MenuIconsDetails[]>(environment.getMenuIconsDetails + catalogId, httpOptions);

  }
  getMenuIcons(): Observable<any> {
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
    return this.http.get<any>(environment.getMenuIcons, httpOptions);

  }
}
