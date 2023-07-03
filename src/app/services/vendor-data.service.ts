import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AddNewCatalog, Catalog,Vendor } from '../data/data-objects';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VendorDataService {

  constructor(private httpclient:HttpClient) { }

  getVendors(): Observable<Vendor[]>{
    return this.httpclient.get<Vendor[]>(environment.getAllVendorsURL)

  }
  getAllCatalogs():Observable<Catalog[]>{
    return this.httpclient.get<Catalog[]>(environment.getAllcatalogs)
  }


  addNewCatalog(addnewcatalog:AddNewCatalog[]){
    return this.httpclient.post<AddNewCatalog[]>(environment.Addnewcatalog ,addnewcatalog)
  }
}
