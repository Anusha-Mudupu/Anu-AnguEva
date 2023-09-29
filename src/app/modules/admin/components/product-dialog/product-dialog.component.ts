/*
 *   Copyright (c) 2023 Dmantz Technologies Pvt ltd
 *   All rights reserved.
 */
import { Component, OnInit, ViewChild } from '@angular/core';
import { Product } from 'src/app/data/data-objects';
import { VendorDataService } from 'src/app/services/vendor-data.service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { ProductDataService } from 'src/app/services/product-data.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

/**
 * File: example.component.ts
 * Author: John Doe
 * Created Date: 2023-07-17
 * Description: This component provides an example implementation in Angular.
 * License: MIT (Example license, replace with your actual license)
 */
import { AddNewCatalogComponent } from '../add-new-catalog/add-new-catalog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.scss']
})
export class ProductDialogComponent implements OnInit {
  snackBar: any;



  constructor(
    private vendorDataService: VendorDataService,
    private productDataService: ProductDataService,
    private dialogRef: MatDialogRef<ProductDialogComponent>,
    private fb: FormBuilder,
    private dailog: MatDialog,
    private router: Router
  ) { }

  submitted: boolean = false;
  product!: Product;
  //selectedCatalogs: Catalog[];
  productForm: any
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  vendorData: any;
  addOnBlur = true;
  searchTags: string[] = [];
  public selectedId: number;
  selectedmanufactureId: any;
  selectedCatalogVals: any;
  selectedVendor: string;
  Catalogsdata: any
  searchText: any;
  selectedcatalogid: any
  currentcatalogs: any
   optionsNameData:any;
   selectedOptionNames:any;
   selectedOptionname:any;
   currentOptionsName:any;

  ngOnInit() {
    this.vendorDataService.getVendors().subscribe((response) => {
      this.vendorData = response;
    })

    this.vendorDataService.getAllCatalogs().subscribe((data: any) => {
      this.Catalogsdata = data;
      //  this.selectedCatalogVals = data;
      console.log(this.Catalogsdata);

    })

    this.productForm = this.fb.group({
      productName: ['', Validators.compose([Validators.required])],
      manufacturerId: ['', Validators.compose([Validators.required])],
      productDesc: ['', Validators.compose([Validators.required])],
      searchTag: ['', Validators.compose([Validators.required])],
      storeId: [1],
      catalog: new FormArray([]),
      productOption:new FormArray([])
    });
  this.productDataService.getAllOptionNames().subscribe((data:any)=>{
    this.optionsNameData=data;
    console.log('optionNamedata',this.optionsNameData)
  })



  }


  get catalog(): FormArray {
    console.log('get selectedCatalogs called');
    return this.productForm.get('catalog') as FormArray;
  }


  get productOption():FormArray{
    console.log('get selectedproductoption called');
    return this.productForm.get('productOption') as FormArray;
  }

  onSelectCatalogs(i: any) {
    console.log("onSelectCatalogs Called", this.selectedCatalogVals);
    //Loops through this.selectedCatalogVals and push each value.
    // for(let i=0;i<this.selectedCatalogVals.length;i++){
    //   this.selectedcatalogid=this.selectedCatalogVals[i].catalogId;
    //   console.log('selectedcatalogid',this.selectedcatalogid);
    // }
    //  this.selectedCatalogs.clear();
    this.selectedcatalogid = this.Catalogsdata[i].catalogId;
    this.currentcatalogs = this.selectedCatalogVals.filter((item: any) => item.catalogId !== this.selectedcatalogid);
    console.log('currentcatalogs', this.currentcatalogs)
    if (this.selectedCatalogVals > this.currentcatalogs) {

      this.catalog.push(this.fb.group({
        catalogId: this.selectedcatalogid,
        primaryFlg: new FormControl('Y'),
        productCatalogId: new FormControl()
      }));
      console.log('if part called');
    }
    else {
      if (this.currentcatalogs <= this.currentcatalogs) {
        this.catalog.clear();
        this.currentcatalogs.forEach((item: any) => {
          this.catalog.push(this.fb.group({
            catalogId: new FormControl(item.catalogId),
            primaryFlg: new FormControl('Y')

          }))
        })
        console.log('else part called');
      }

    }
    console.log('product form', this.productForm.value)
    //TODO create new form group and push to selectedCatalogs
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




  addProduct(productForm: any) {
    this.productForm.controls['searchTag'].setValue(this.searchTags.toString());
    console.log(this.productForm.value);
    this.submitted = true;
    if (this.productForm.valid) {
      this.productDataService.addProduct(this.productForm.value).subscribe(res => {
        console.log(res);
        alert('Product Added Successfully');

      }, errorMsg => {
        alert('Something Went Wrong');
      });
      this.searchTags = []
      // this.router.navigate(['/admin/products'])
      // setTimeout(() => {
      //   this.productForm.reset();
      //  this.snackBar.open('Form submitted successfully!', 'Close', {
      //     duration: 4000,
      //   });
      // }, 2000); 
      this.dialogRef.close();
    }


  }
  addNewCatalog() {
    const dialogRef = this.dailog.open(AddNewCatalogComponent, {})
  }


  getInputStyles() {
    return {
      'background-color': 'var(--toast-background)',
      'color': 'var(--toast-text)',
      // ... other styling properties
    };

  }




  onSelectOptionName(i:any){
    console.log("onSelectoptionName Called", this.selectedOptionNames);
  
    this.selectedOptionname = this.optionsNameData[i].optionName;
    this.currentOptionsName = this.selectedOptionNames.filter((item: any) => item.optionName !== this.selectedOptionname);
    console.log('currentcatalogs', this.currentOptionsName)
    if (this.selectedOptionNames > this.currentOptionsName) {

      this.productOption.push(this.fb.group({
        optionName: this.selectedOptionname,
      
      }));
      console.log('if part called');
    }
    else {
      if (this.currentOptionsName <= this.currentOptionsName) {
        this.productOption.clear();
        this.currentOptionsName.forEach((item: any) => {
          this.productOption.push(this.fb.group({
            optionName: new FormControl(item.optionName),
            

          }))
        })
        console.log('else part called');
      }

    }
    console.log('product form', this.productForm.value)
    

  }


}








