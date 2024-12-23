/*
 *   Copyright (c) 2024 Dmantz Technologies private limited
 *   All rights reserved.
 */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TrendProductService {

  constructor(private http: HttpClient) { }

  public getTrendProductInfo() {
    return this.http.get<any>(environment.TrendProdUrl).pipe();
  }

}
