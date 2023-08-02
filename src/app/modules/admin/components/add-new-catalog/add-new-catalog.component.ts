/*
 *   Copyright (c) 2023 Dmantz Technologies Pvt ltd
 *   All rights reserved.
 */
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AddNewCatalog } from 'src/app/data/data-objects';
import { VendorDataService } from 'src/app/services/vendor-data.service';

@Component({
  selector: 'app-add-new-catalog',
  templateUrl: './add-new-catalog.component.html',
  styleUrls: ['./add-new-catalog.component.scss']
})
export class AddNewCatalogComponent implements OnInit {
  addnewcatalogform:any
  submitted: boolean = false;
  parentcatalogdata:any
  constructor(  private dialogRef: MatDialogRef<AddNewCatalogComponent>,private vendorservice:VendorDataService,private formBuilder: FormBuilder) {

this.addnewcatalogform = this.formBuilder.group({
  // catalogId: ['', Validators.compose([Validators.required])],
  parentCatalogId: ['', Validators.compose([Validators.required])],
  catalogLevel: ['',Validators.compose([Validators.required])],
  catalogName: ['', Validators.compose([Validators.required])],
  catalogDesc: ['', Validators.compose([Validators.required])],
  storeId: ['1', Validators.compose([Validators.required])],
 

})

   }

  ngOnInit(): void {
    this.vendorservice.getAllParentCatalogs().subscribe((data:any)=>{
     this.parentcatalogdata=data;
     console.log(data);
     console.log('this.parentcatalogdata',this.parentcatalogdata)
 })


  }






  addNewCatalog(addnewcatalogform:any){
        this.submitted=true;
        console.log(this.addnewcatalogform.value)
        if(this.addnewcatalogform.valid){
          this.vendorservice.addNewCatalog(this.addnewcatalogform.value).subscribe(data=>{
            console.log(data);
            alert('Catalog added Successflly');
          })
        }
       }

}
