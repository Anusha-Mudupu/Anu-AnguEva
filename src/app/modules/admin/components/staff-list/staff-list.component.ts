import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Staffdata } from 'src/app/data/data-objects';
import { StaffDataService } from 'src/app/services/staff-data.service';
import { AddStaffComponent } from '../add-staff/add-staff.component';

@Component({
  selector: 'app-staff-list',
  templateUrl: './staff-list.component.html',
  styleUrls: ['./staff-list.component.scss']
})
export class StaffListComponent implements OnInit {
staffdata:any
  constructor( private staffservice:StaffDataService, private dailog:MatDialog) { }
  displayedColumns: string[] = ['staffCd', 'staffName', 'mobileNo','emailId','startDt','endDt','Actions'];
  dataSource = new MatTableDataSource<Staffdata>();


  ngOnInit(): void {
 this.staffservice.getStaffList().subscribe((data:any)=>{
  this.dataSource = new MatTableDataSource(data);
  this.staffdata=data;
  console.log('raaaaji',data);
 })
  }


  addStaff(){
    const dialogRef =this.dailog.open( AddStaffComponent,{ }).afterClosed().subscribe((result:any)=>{
     
      this.ngOnInit();})
  }

}
