/*
 *   Copyright (c) 2023 Dmantz Technologies Pvt ltd
 *   All rights reserved.
 */
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
  // isEditMode:boolean=true;
  staffdata:any;
  // isDisabled: boolean = true;
  submitted:boolean= false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private staffdataservice:StaffDataService,private router:Router,private formbuilder:FormBuilder) { 
    this.staffCd=data.staffCd
    console.log('staffCd',this.staffCd);

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
    this.UpdateStaffform=this.formbuilder.group({
      staffName:['',Validators.compose ([Validators.required])],
      // emailId: ['',Validators.compose ([Validators.required, Validators.email])],
      emailId:['',[Validators.required, Validators.pattern(/^[\w]{1,}[\w.+-]{0,}@[\w-]{1,}([.][a-zA-Z]{2,}|[.][\w-]{2,}[.][a-zA-Z]{2,})$/)]],
      mobileNo: ['', [Validators.required,  Validators.maxLength(10),Validators.minLength(10),Validators.pattern(/^[0-9]*$/)]],      
      dob: ['', [Validators.required,Validators.pattern(/^[0-9]*$/)]],
        area: ['', Validators.required],
        city: ['', Validators.required],
        state: ['', Validators.required],
         pincode: ['', [Validators.required,Validators.maxLength(6),Validators.minLength(6),Validators.pattern(/^[0-9]*$/)]],
       startDt: ['', [Validators.required ,Validators.pattern(/^[0-9]*$/)]],
       endDt: ['', Validators.required,Validators.pattern(/^[0-9]*$/)],
       opStaffId:new FormControl(''),
         staffCd:new FormControl('')
    
    })
  }

  ngOnInit(): void {
this.staffdataservice.getStaffByStaffCd(this.staffCd).subscribe(data=>{
  this.staffdata=data;
  console.log('StaffData',this.staffdata)
}) 
// this.edit()
}

saveUpdateStaff(){
 
  this.staffdataservice.updateStaffByid(this.staffCd,this.staffdata).subscribe((data=>{
    console.log(data);
    alert('Successfully Updated');
  }))
}

  onSubmit(){
    
    if(this.UpdateStaffform.valid){
      this.submitted=true;
       this.saveUpdateStaff()
    }
     
 else{
  if(this.UpdateStaffform.invalid){
    window.alert('Form Is Invalid Please Check it Once');
  }
 }

 
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
}
