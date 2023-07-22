/*
 *   Copyright (c) 2023 Dmantz Technologies Pvt ltd
 *   All rights reserved.
 */
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { StaffDataService } from 'src/app/services/staff-data.service';

@Component({
  selector: 'app-update-staff',
  templateUrl: './update-staff.component.html',
  styleUrls: ['./update-staff.component.scss']
})
export class UpdateStaffComponent implements OnInit {
  staffCd:any
  UpdateStaffform:any;
  isEditMode:boolean=true;
  staffdata:any;
  isDisabled: boolean = true;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private staffdataservice:StaffDataService,private router:Router) { 
    this.staffCd=data.staffCd
    console.log('staffCd',this.staffCd);

    this.UpdateStaffform=new FormGroup({
      staffName:new FormControl(),
      emailId: new FormControl(),
      mobileNo: new FormControl(),                                  
      dob: new FormControl(),
      area: new FormControl(),
      city: new FormControl(),
      state: new FormControl(),
      pincode: new FormControl(),
      startDt: new FormControl(),
      endDt: new FormControl(),
      opStaffId:new FormControl(),
      staffCd:new FormControl()
    })
  }

  ngOnInit(): void {
this.staffdataservice.getStaffByStaffCd(this.staffCd).subscribe(data=>{
  this.staffdata=data;
  console.log('StaffData',this.staffdata)
}) 
this.edit()
}

saveUpdateStaff(){
  this.staffdataservice.updateStaffByid(this.staffCd,this.staffdata).subscribe((data=>{
    console.log(data);
    alert('Successfully Updated');
  }))
}

  onSubmit(){
this.saveUpdateStaff()
 
  }

 


 edit (){
 this.isEditMode=!this.isEditMode
 if (this.isEditMode ==true) {
   this.UpdateStaffform.enable();  
 } 
 else
 if(this.isEditMode==false) {
   this.UpdateStaffform.disable();
  
 }
}
}
