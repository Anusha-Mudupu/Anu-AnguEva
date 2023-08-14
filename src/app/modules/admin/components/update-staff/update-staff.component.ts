/*
 *   Copyright (c) 2023 Dmantz Technologies Pvt ltd
 *   All rights reserved.
 */
import { DatePipe } from '@angular/common';
import { ReturnStatement } from '@angular/compiler';
import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { StaffDataService } from 'src/app/services/staff-data.service';

@Component({
  selector: 'app-update-staff',
  templateUrl: './update-staff.component.html',
  styleUrls: ['./update-staff.component.scss']
})
export class UpdateStaffComponent implements OnInit {
  opStaffId: any
  UpdateStaffform: any;
  // isEditMode:boolean=true;
  staffdata: any;
  // isDisabled: boolean = true;
  submitted: boolean = false;
  updateForm: FormGroup;
  staffRoleData: any;
  staffRole: any;
  selectedstaffroles: any;
  selectedStaffRoleId: any;
  currentStaffRoles: any;
  filteredStaffRole: any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private staffdataservice: StaffDataService, private router: Router, private formbuilder: FormBuilder, public dialogRef: MatDialogRef<UpdateStaffComponent>, private formBuilder: FormBuilder) {
    this.opStaffId = data.opStaffId
    console.log('opStaffId', this.opStaffId);

    // this.UpdateStaffform=new FormGroup({
    //   staffName:new FormControl(),
    //   emailId: new FormControl(),
    //   mobileNo: new FormControl(),                                  
    //   dob: new FormControl(),
    //   area: new FormControl(),
    //   city: new FormControl(),
    //   state: new FormControl(),
    //   pincode: new FormControl(),
    //   startDt: new FormControl(),
    //   endDt: new FormControl(),
    //   opStaffId:new FormControl(),
    //   staffCd:new FormControl()
    // })

    this.UpdateStaffform = this.formbuilder.group({
      staffName: ['', Validators.compose([Validators.required])],
      emailId: ['', [Validators.required, Validators.pattern(/^[\w]{1,}[\w.+-]{0,}@[\w-]{1,}([.][a-zA-Z]{2,}|[.][\w-]{2,}[.][a-zA-Z]{2,})$/)]],
      mobileNo: ['', [Validators.required, Validators.maxLength(6), Validators.minLength(6), Validators.pattern(/^[0-9]*$/)]],
      dob: ['', [Validators.required, Validators.pattern(/^[0-9]*$/)]],
      area: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      pincode: ['', [Validators.required, Validators.maxLength(6), Validators.minLength(6), Validators.pattern(/^[0-9]*$/)]],
      startDt: ['', [Validators.required, Validators.pattern(/^[0-9]*$/)]],
      endDt: ['', [Validators.required, Validators.pattern(/^[0-9]*$/)]],
      opStaffId: new FormControl(''),
      staffCd: new FormControl(''),
      staffRole: new FormArray([])
    })
  }

  ngOnInit(): void {
    this.staffdataservice.getStaffByStaffCd(this.opStaffId).subscribe(data => {
      this.staffdata = data;
      console.log('StaffData', this.staffdata);
    })
    // this.edit()
    this.staffdataservice.getAllStaffRoles().subscribe((data: any) => {
      this.staffRoleData = data;
      this.filteredStaffRole = this.staffRoleData.filter((item: any) => {
        return this.staffRoleData.some((filteritem: any) => {
          return filteritem.roleId == item.roleId;
        })
      })
      console.log('filtereddata',this.filteredStaffRole)
    })

  }

  saveUpdateStaff() {

    this.staffdataservice.updateStaffByid(this.opStaffId, this.staffdata).subscribe((data => {
      console.log(data);
      alert('Successfully Updated');
      this.dialogRef.close();
    }), errorMsg => {
      alert('Something Went Wrong');
    })
  }

  onSubmit() {
    console.log(this.UpdateStaffform.value);

    this.saveUpdateStaff()
  }
  //  edit (){
  //  this.isEditMode=!this.isEditMode
  //  if (this.isEditMode ==true) {
  //    this.UpdateStaffform.enable();  
  //  } 
  //  else
  //  if(this.isEditMode==false) {
  //    this.UpdateStaffform.disable();

  //  }
  // }
  onSelectStaffRole(i: any) {
    this.selectedStaffRoleId = this.staffRoleData[i].roleId
    console.log(this.selectedStaffRoleId);
    this.currentStaffRoles = this.selectedstaffroles.filter((item: any) => item.roleId != this.selectedStaffRoleId);
    console.log('remove selected', this.currentStaffRoles);
    if (this.selectedstaffroles > this.currentStaffRoles) {
      this.staffRole.push(this.formBuilder.group({
        roleId: this.selectedStaffRoleId

      }));
      console.log('if called')
      console.log(this.UpdateStaffform.value);
    }
    else {
      if (this.currentStaffRoles <= this.currentStaffRoles) {
        this.staffRole.clear();
        this.currentStaffRoles.forEach((item: any) => {
          this.staffRole.push(this.formBuilder.group({
            roleId: item.roleId
          }))
        })
        console.log('else called');
        console.log(this.UpdateStaffform.value);
      }
    }

  }

}
