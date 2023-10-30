/*
 *   Copyright (c) 2023 Dmantz Technologies Pvt ltd
 *   All rights reserved.
 */
import { Component, OnInit } from '@angular/core';
import { MatDialog} from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Staffdetails } from 'src/app/data/data-objects';
import { StaffDataService } from 'src/app/services/staff-data.service';
import { AddStaffComponent } from '../add-staff/add-staff.component';
import { UpdateStaffComponent } from '../update-staff/update-staff.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-staff-list',
  templateUrl: './staff-list.component.html',
  styleUrls: ['./staff-list.component.scss']
})
export class StaffListComponent implements OnInit {
staffdata:any;
loading1: boolean=true;
loading = false;
  constructor( private staffservice:StaffDataService, private dailog:MatDialog,private active:ActivatedRoute ) { }
  displayedColumns: string[] = ['staffCd', 'staffName', 'mobileNo','emailId','startDt','endDt','Actions'];
  dataSource = new MatTableDataSource<Staffdetails>();


  ngOnInit(): void {
 this.staffservice.getStaffList().subscribe((data:any)=>{
  this.dataSource = new MatTableDataSource(data);
  this.staffdata=data;
  console.log('staffData',data);
  setTimeout(()=>{
    this.loading1=false
  },1000);
 })
  }


  addStaffbtn(){
    const dialogRef =this.dailog.open( AddStaffComponent,{ }).afterClosed().subscribe((result:any)=>{
     this.ngOnInit();})
  }
  updateStaff(opStaffId:any){
    const dialogRef =this.dailog.open( UpdateStaffComponent,{
          
      data: { opStaffId:opStaffId}
    }).afterClosed().subscribe(result=>{
     
      this.ngOnInit();})
  }



}
