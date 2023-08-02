/*
 *   Copyright (c) 2023 Dmantz Technologies Pvt ltd
 *   All rights reserved.
 */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { AddNewCatalog, Catalog,Vendor, parentCatalogData } from '../data/data-objects';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class VendorDataService {
abc='http://localhost:8085/api/getAllCatalog'

  constructor(private httpclient:HttpClient) { }

  getVendors(): Observable<Vendor[]>{
    return this.httpclient.get<Vendor[]>(environment.getAllVendorsURL)

  }
  getAllCatalogs():Observable<any>{
    return this.httpclient.get<Catalog>(environment.getAllcatalogs)
  }

  getData(): Observable<any> {
    return of(this.abc);
  }

  addNewCatalog(addnewcatalog:AddNewCatalog){
    return this.httpclient.post<AddNewCatalog>(environment.Addnewcatalog ,addnewcatalog)
  }

getAllParentCatalogs():Observable<any>{
  return this.httpclient.get<any>(environment.getAllParentCatalogs)
}

}
