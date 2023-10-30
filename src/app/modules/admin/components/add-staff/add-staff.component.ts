/*
 *   Copyright (c) 2023 Dmantz Technologies Pvt ltd
 *   All rights reserved.
 */
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { StaffDataService } from 'src/app/services/staff-data.service';

@Component({
  selector: 'app-add-staff',
  templateUrl: './add-staff.component.html',
  styleUrls: ['./add-staff.component.scss']
})
export class AddStaffComponent implements OnInit {
  addstaffform: any;
  submitted: boolean = false;
  staffdata: any
  snackBar: any;
  staffRoleData: any;
  selectedstaffroles: any;
  selectedStaffRoleId: any;
  currentStaffRoles: any;
  mobileNumberValidator:any;
  
  constructor(private dialogRef: MatDialogRef<AddStaffComponent>, private formBuilder: FormBuilder, private staffservice: StaffDataService, private router: Router) {
    this.mobileNumberValidator = (control:any) => {
      const value = control.value;
    
      if (value && /^[6-9]\d{9}$/.test(value)) {
        return null; // Valid mobile number
      } else {
        return { invalidMobileNumber: true }; // Invalid mobile number
      }
    };
    this.addstaffform = this.formBuilder.group({
      staffName: ['', Validators.compose([Validators.required])],
      emailId: ['', Validators.compose([Validators.required, Validators.email])],
      mobileNo: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(10), Validators.pattern(/^[0-9]*$/),this.mobileNumberValidator]],
      dob: ['', [Validators.required,]],
      area: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      pincode: ['', [Validators.required, Validators.maxLength(6), Validators.minLength(6), Validators.pattern(/^[0-9]*$/)]],
      startDt: ['', Validators.required],
      endDt: new FormControl('',),
      staffRole: new FormArray([])

    })
   
  }
  ngOnInit(): void {
    this.staffservice.getAllStaffRoles().subscribe((data: any) => {
      this.staffRoleData = data;
      console.log(this.staffRoleData);
    })
  }


  addSatff() {
    this.submitted = true;
    if (this.addstaffform.valid) {

      this.staffservice.addStaff(this.addstaffform.value).subscribe((data => {
        this.staffdata = data;
        console.log(this.addstaffform.value);
        console.log(data)
        alert('Staff Added Successfully');
        this.dialogRef.close();
      }),errorMsg=>{
        alert('Something Went Wrong');
      })
      
    }
    // setTimeout(() => {
    //   this.addstaffform.reset();
    //  this.snackBar.open('Form submitted successfully!', 'Close', {
    //     duration: 4000,
    //   });
    // }, 2000); 

    // this.router.navigate(['/admin/staff-list'])
  }
  get staffRole(): FormArray {
    console.log('get selectedstaffroles called', this.selectedstaffroles);
    return this.addstaffform.get('staffRole') as FormArray;
  }

  onSelectStaffRole(i: any) {
    this.selectedStaffRoleId = this.staffRoleData[i].roleId
    console.log(this.selectedStaffRoleId);
    this.currentStaffRoles = this.selectedstaffroles.filter((item: any) => item.roleId != this.selectedStaffRoleId);
    console.log('remove selected', this.currentStaffRoles);
    if (this.selectedstaffroles>this.currentStaffRoles) {
      this.staffRole.push(this.formBuilder.group({
        roleId: this.selectedStaffRoleId,
        opStaffId:new FormControl()
      }));
      console.log('if called')
      console.log(this.addstaffform.value);
    }
    else {
      if (this.currentStaffRoles <=this.currentStaffRoles) {
        this.staffRole.clear();
        this.currentStaffRoles.forEach((item: any) => {
          this.staffRole.push(this.formBuilder.group({
            roleId: item.roleId,
            opStaffId:new FormControl()
          }))
        })
        console.log('else called');
        console.log(this.addstaffform.value);
      }
    }

  }

  getInputStyles() {
    return {
      'background-color': 'var(--toast-background)',
      'color': 'var(--toast-text)',
      // ... other styling properties
    };
  }


}
