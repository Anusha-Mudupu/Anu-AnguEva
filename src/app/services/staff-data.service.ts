import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Staffdata } from '../data/data-objects';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StaffDataService {

  constructor(private httpclient:HttpClient) { }


  getStaffList(){
    return this.httpclient.get<Staffdata>(environment.getstafflistUrl)
  }



  addStaff(addstaff:Staffdata){
    return this.httpclient.post<Staffdata>(environment.addstaffurl,addstaff)
  }
}
