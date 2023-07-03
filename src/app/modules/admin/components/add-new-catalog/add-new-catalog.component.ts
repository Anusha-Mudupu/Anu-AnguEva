import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
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
  constructor(  private dialogRef: MatDialogRef<AddNewCatalogComponent>,private vendorservice:VendorDataService,private formBuilder: FormBuilder) {
this.addnewcatalogform=new FormGroup({
  catalogId:new FormControl(),
  parentCatalogId: new FormControl(),
  catalogLevel: new FormControl(),
  catalogName: new FormControl(),
  catalogDesc: new FormControl(),
  storeId: new FormControl('1')

})

   }

  ngOnInit(): void {
  }






  addNewCatalog(addnewcatalogform:any){

    this.vendorservice.addNewCatalog(this.addnewcatalogform.value).subscribe(data=>{
      console.log(data);
      alert('Catalog added Successflly');
    })
  }

}
