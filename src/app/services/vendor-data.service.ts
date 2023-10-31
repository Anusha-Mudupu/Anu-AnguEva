/*
 *   Copyright (c) 2023 Dmantz Technologies Pvt ltd
 *   All rights reserved.
 */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { AddNewCatalog, Catalog, Vendor, parentCatalogData } from '../data/data-objects';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class VendorDataService {
  // abc = 'http://localhost:8085/api/getAllCatalog'

  constructor(private httpclient: HttpClient) { }

  getVendors(): Observable<Vendor[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'responseType': 'text,application/json',
        'Access-Control-Allow-Origin': 'http://localhost:8085',
        'Access-Control-Allow-Methods': "DELETE, POST, GET, OPTIONS",
        'Access-Control-Allow-Headers': 'Content-Type,application/json',
        'Authorization': 'my-auth-token'
      })
    };
    return this.httpclient.get<Vendor[]>(environment.getAllVendorsURL, httpOptions)

  }
  getAllCatalogs(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'responseType': 'text,application/json',
        'Access-Control-Allow-Origin': 'http://localhost:8085',
        'Access-Control-Allow-Methods': "DELETE, POST, GET, OPTIONS",
        'Access-Control-Allow-Headers': 'Content-Type,application/json',
        'Authorization': 'my-auth-token'
      })
    };
    return this.httpclient.get<Catalog>(environment.getAllcatalogs, httpOptions)
  }

  getData(): Observable<any> {
    return of(environment.getAllcatalogs);
  }

  addNewCatalog(addnewcatalog: AddNewCatalog) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'responseType': 'text,application/json',
        'Access-Control-Allow-Origin': 'http://localhost:8085',
        'Access-Control-Allow-Methods': "DELETE, POST, GET, OPTIONS",
        'Access-Control-Allow-Headers': 'Content-Type,application/json',
        'Authorization': 'my-auth-token'
      })
    };
    return this.httpclient.post<AddNewCatalog>(environment.Addnewcatalog, addnewcatalog, httpOptions)
  }

  getAllParentCatalogs(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'responseType': 'text,application/json',
        'Access-Control-Allow-Origin': 'http://localhost:8085',
        'Access-Control-Allow-Methods': "DELETE, POST, GET, OPTIONS",
        'Access-Control-Allow-Headers': 'Content-Type,application/json',
        'Authorization': 'my-auth-token'
      })
    };
    return this.httpclient.get<any>(environment.getAllParentCatalogs, httpOptions);
  }

}
