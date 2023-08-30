/*
 *   Copyright (c) 2023 Dmantz Technologies Pvt ltd
 *   All rights reserved.
 */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StaffRoles,  Staffdetails } from '../data/data-objects';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StaffDataService {

  constructor(private httpclient:HttpClient) { }


  getStaffList():Observable<any>{
    const httpOptions = {
      headers :new HttpHeaders({
        'Content-Type':'application/json',
        'Accept':'application/json',
        'responseType':'text,application/json',              
        'Access-Control-Allow-Origin':'http://localhost:8085',
        'Access-Control-Allow-Methods':"DELETE, POST, GET, OPTIONS",
        'Access-Control-Allow-Headers':'Content-Type,application/json',
        'Authorization':'my-auth-token' 
      })
    };
    return this.httpclient.get<Staffdetails>(environment.getstafflistUrl,httpOptions)
  }

 addStaff(addstaff:Staffdetails){
  const httpOptions = {
    headers :new HttpHeaders({
      'Content-Type':'application/json',
      'Accept':'application/json',
      'responseType':'text,application/json',              
      'Access-Control-Allow-Origin':'http://localhost:8085',
      'Access-Control-Allow-Methods':"DELETE, POST, GET, OPTIONS",
      'Access-Control-Allow-Headers':'Content-Type,application/json',
      'Authorization':'my-auth-token' 
    })
  };
    return this.httpclient.post<Staffdetails>(environment.addstaffurl,addstaff,httpOptions)
  }


  getStaffByStaffCd(staffCd:any){
    const httpOptions = {
      headers :new HttpHeaders({
        'Content-Type':'application/json',
        'Accept':'application/json',
        'responseType':'text,application/json',              
        'Access-Control-Allow-Origin':'http://localhost:8085',
        'Access-Control-Allow-Methods':"DELETE, POST, GET, OPTIONS",
        'Access-Control-Allow-Headers':'Content-Type,application/json',
        'Authorization':'my-auth-token' 
      })
    };
    return this.httpclient.get<Staffdetails>(environment.getstaffBystaffCd +staffCd,httpOptions)
  }

  updateStaffByid(staffid:any,staffdata:Staffdetails){
    const httpOptions = {
      headers :new HttpHeaders({
        'Content-Type':'application/json',
        'Accept':'application/json',
        'responseType':'text,application/json',              
        'Access-Control-Allow-Origin':'http://localhost:8085',
        'Access-Control-Allow-Methods':"DELETE, POST, GET, OPTIONS",
        'Access-Control-Allow-Headers':'Content-Type,application/json',
        'Authorization':'my-auth-token' 
      })
    };
    return this.httpclient.put<Staffdetails>(environment.updateStaff +staffid,staffdata,httpOptions)
  }

  getAllStaffRoles(){
    const httpOptions = {
      headers :new HttpHeaders({
        'Content-Type':'application/json',
        'Accept':'application/json',
        'responseType':'text,application/json',              
        'Access-Control-Allow-Origin':'http://localhost:8085',
        'Access-Control-Allow-Methods':"DELETE, POST, GET, OPTIONS",
        'Access-Control-Allow-Headers':'Content-Type,application/json',
        'Authorization':'my-auth-token' 
      })
    };
    return this.httpclient.get<StaffRoles>(environment.getStaffRoles,httpOptions);
  }
}
