/*
 *   Copyright (c) 2023 Dmantz Technologies Pvt ltd
 *   All rights reserved.
 */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { StaffDataService } from 'src/app/services/staff-data.service';

@Component({
  selector: 'app-add-staff',
  templateUrl: './add-staff.component.html',
  styleUrls: ['./add-staff.component.scss']
})
export class AddStaffComponent implements OnInit {
  addstaffform:any;
  submitted:boolean= false;
  staffdata:any
  snackBar: any;
  constructor(private dialogRef: MatDialogRef<AddStaffComponent>,private formBuilder: FormBuilder,private staffservice:StaffDataService,private router:Router) {
    this.addstaffform=this.formBuilder.group({
      staffName:['',Validators.compose ([Validators.required])],
      emailId: ['',Validators.compose ([Validators.required, Validators.email])],
      mobileNo: ['', [Validators.required,  Validators.maxLength(10),Validators.minLength(10),Validators.pattern(/^[0-9]*$/)]],      
      dob: ['', [Validators.required,]],
        area: ['', Validators.required],
        city: ['', Validators.required],
        state: ['', Validators.required],
         pincode: ['', [Validators.required,Validators.maxLength(6),Validators.minLength(6),Validators.pattern(/^[0-9]*$/)]],
       startDt: ['', Validators.required],
     endDt:new FormControl('')
    
    })

   }
   ngOnInit(): void {
  }

  
  addSatff(){
    this.submitted=true;
    if(this.addstaffform.valid){
    
      this.staffservice.addStaff(this.addstaffform.value).subscribe((data=>{
        this.staffdata=data;
        console.log(this.addstaffform.value);
        console.log(data)
         alert('Staff Added Successfully');
      }))
      this.dialogRef.close();
    }
    // setTimeout(() => {
    //   this.addstaffform.reset();
    //  this.snackBar.open('Form submitted successfully!', 'Close', {
    //     duration: 4000,
    //   });
    // }, 2000); 
    
    // this.router.navigate(['/admin/staff-list'])
  }

}
