import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { StaffDataService } from 'src/app/services/staff-data.service';

@Component({
  selector: 'app-add-staff',
  templateUrl: './add-staff.component.html',
  styleUrls: ['./add-staff.component.scss']
})
export class AddStaffComponent implements OnInit {
  addstaffform:any;
  standalone: true
  constructor(private dialogRef: MatDialogRef<AddStaffComponent>,private formBuilder: FormBuilder,private staffservice:StaffDataService) {
    this.addstaffform=new FormGroup({
      staffName:new FormControl(),
      emailId: new FormControl(),
      mobileNo: new FormControl(),                                  
      dob: new FormControl(),
      area: new FormControl(),
      city: new FormControl(),
      state: new FormControl(),
      pincode: new FormControl(),
      startDt: new FormControl(),
      endDt: new FormControl()
    
    })
   }
   ngOnInit(): void {
  }

  
  addSatff(addstaffform:any){
this.staffservice.addStaff(this.addstaffform.value).subscribe((data=>{
  console.log(this.addstaffform.value);
  console.log(data)
}))
  }

}
