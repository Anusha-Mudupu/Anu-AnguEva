/*
 *   Copyright (c) 2023 Dmantz Technologies Pvt ltd
 *   All rights reserved.
 */
import { HttpClient } from '@angular/common/http';
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
    return this.httpclient.get<Staffdetails>(environment.getstafflistUrl)
  }

 addStaff(addstaff:Staffdetails){
    return this.httpclient.post<Staffdetails>(environment.addstaffurl,addstaff)
  }


  getStaffByStaffCd(staffCd:any){
    return this.httpclient.get<Staffdetails>(environment.getstaffBystaffCd +staffCd)
  }

  updateStaffByid(staffid:any,staffdata:Staffdetails){
    return this.httpclient.put<Staffdetails>(environment.updateStaff +staffid,staffdata)
  }

  getAllStaffRoles(){
    return this.httpclient.get<StaffRoles>(environment.getStaffRoles);
  }
}
