/*
 *   Copyright (c) 2023 Dmantz Technologies Pvt ltd
 *   All rights reserved.
 */
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ProductSkuDataService } from 'src/app/services/productsku-data.service';

@Component({
  selector: 'app-add-new-option',
  templateUrl: './add-new-option.component.html',
  styleUrls: ['./add-new-option.component.scss']
})
export class AddNewOptionComponent implements OnInit {
  AddnewOptionform:FormGroup;
  submitted: boolean = false;
  snackBar: any;
  constructor( private fb: FormBuilder,private http:HttpClient,private productskudataservice:ProductSkuDataService,private router:Router) { }

  ngOnInit(): void {
   this.AddnewOptionform=this.fb.group({
    // optionName:new FormControl(''),
    optionName: ['', Validators.compose([Validators.required])],
    optionValue: ['', Validators.compose([Validators.required])],
    // optionValue:new FormControl('')
    })
  }

  addNewOption(){
    this.submitted=true
    if(this.AddnewOptionform.valid){
   this.productskudataservice.addNewOption(this.AddnewOptionform.value).subscribe((res:any)=>{
    console.log(res);
    alert('Successfully Added NewOption');
   })

   setTimeout(() => {
    this.AddnewOptionform.reset();
   this.snackBar.open('Form submitted successfully!', 'Close', {
      duration: 4000,
    });
  }, 2000); 
  
    }
   
  }


  // cancel(){
  //   this.router.navigate(['/admin/product-view/:productId/:productSkuId'])
  // }
}
       
   