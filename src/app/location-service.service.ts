/*
 *   Copyright (c) 2024 Dmantz Technologies private limited
 *   All rights reserved.
 */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationServiceService {
  private apiKey = '68e00c9f2a15440d8b3673ebfb44b5f7'; // Replace with your OpenCage API key

  constructor(private http: HttpClient) {}

  getCityName(latitude: number, longitude: number): Observable<any> {
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${this.apiKey}`;
    return this.http.get(url);
  }

  
}
