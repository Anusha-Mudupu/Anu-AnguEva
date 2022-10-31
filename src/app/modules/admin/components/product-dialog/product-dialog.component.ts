import { Component, OnInit } from '@angular/core';
import { SearchTag, Vendor } from 'src/app/data/data-objects';
import { VendorDataService } from 'src/app/services/vendor-data.service';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
import { FormGroup,FormBuilder,Validators,FormControl } from '@angular/forms';
import { ProductDataService } from 'src/app/services/product-data.service';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.scss']
})
export class ProductDialogComponent implements OnInit {

  constructor(
    private vendorDataService: VendorDataService, 
    private formBuilder: FormBuilder, 
    private productDataService: ProductDataService,
    private dialogRef: MatDialogRef<ProductDialogComponent>
    ) { }

  productForm !: FormGroup
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  vendorData: Vendor[] = [];
  addOnBlur = true;
  searchTags: string[] = [];

  ngOnInit(){
    this.vendorDataService.getVendors().subscribe((response) => {
      this.vendorData = response;
      // console.log(response)
    }),
    this.productForm = this.formBuilder.group({
      productName: ['', Validators.required],
      manufacturerId: ['', Validators.required],
      productDesc: [''],
      search_tags: ['', Validators.required],
      storeId: [1]
    })
  }


  addTag(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add Search Tag
    if (value) {
      this.searchTags.push(value);
    }
    // Clear the input value
    event.chipInput!.clear();
  }

  removeTag(searchTag: string): void {
    const index = this.searchTags.indexOf(searchTag);

    if (index >= 0) {
      this.searchTags.splice(index, 1);
    }
  }

  AddProduct(){
    this.productForm.controls['search_tags'].setValue(this.searchTags.toString());
    console.log(this.productForm.value);
    if(this.productForm.valid){
    this.productDataService.addProduct(this.productForm.value)
    .subscribe({
      next:(res) => {
        alert("Product Added Successfully");
        this.productForm.reset();
        this.dialogRef.close();
      },
      error:(error) => {
        alert("Something's wrong please check Console");
        console.log(error)
      }
    })
    }
    this.searchTags = [];
  }

}
