import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vendor } from '../data/data-objects';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VendorDataService {

  constructor(private httpclient:HttpClient) { }

  getVendors(): Observable<Vendor[]>{
    return this.httpclient.get<Vendor[]>(environment.getAllVendorsURL)

  }
}
