/*
 *   Copyright (c) 2023 Dmantz Technologies Pvt ltd
 *   All rights reserved.
 */
import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductDataService } from 'src/app/services/product-data.service';
import { VendorDataService } from 'src/app/services/vendor-data.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.scss']
})
export class UpdateProductComponent implements OnInit {
  productId: any;
  productdata: any
  updateproductform: any;
  catalogsdata: any[] = [];
  selectedCatalogVals: any;
  searchTags: any;
  vendorData: any;
  AllcatalogData: any;

  filteredcatalogdata: any;
  selectedcatalogid: any
  currentcatalogs: any
  catalogItems: any;
  v1:any;
  selectedvendors: any;
  filtervendordata: any;
  vendorData1: any
  manufacturerNames: string[] = [];
  manufacturerObject: any;
  snackBar: any;
  abc:any;
  constructor(private productservice: ProductDataService, @Inject(MAT_DIALOG_DATA) public data: any, private vendorservice: VendorDataService, private fb: FormBuilder, public dialogRef: MatDialogRef<UpdateProductComponent>,) {
    this.updateproductform = this.fb.group({
      productName: new FormControl('', [Validators.required]),
      manufacturerId: new FormControl('', [Validators.required]),
      productId: new FormControl('', [Validators.required]),
      productDesc: new FormControl('', [Validators.required]),
      searchTag: new FormControl('', [Validators.required]),
      storeId: new FormControl('', [Validators.required]),
      catalog: new FormArray([])
    });


  }

  ngOnInit(): void {


    this.productId = this.data.productId;
    console.log(this.productId)
    this.productservice.getProductById(this.productId).subscribe((res => {
      this.productdata = res;
      this.catalogsdata = this.productdata.catalog;
      console.log(this.productdata);
      this.manufacturerObject = this.productdata.manufacturerName;
      console.log(this.manufacturerObject)
      this.manufacturerObject = { manufacturerId: this.productdata.manufacturerId, manufacturerName: this.productdata.manufacturerName };
      this.manufacturerNames.push(this.manufacturerObject);
      console.log('manufacturerNames', this.manufacturerNames);
      console.log('nested catalogdata', this.catalogsdata);
    }));


    this.vendorservice.getAllCatalogs().subscribe((data: any) => {
      this.AllcatalogData = data;
      this.filteredcatalogdata = this.AllcatalogData.filter((item: any) => {
        return this.catalogsdata.some((fiteritem: any) => {
          return fiteritem.catalogId === item.catalogId
        })
      })
      this.selectedCatalogVals = this.filteredcatalogdata;
      this.catalogItems = this.selectedCatalogVals.map((item: any) => {
        return this.catalog.push(this.fb.group({
          catalogId: item.catalogId,
          primaryFlg: new FormControl('Y'),

        }));
      });

      console.log(this.updateproductform.value)
      console.log("filteredcatalogdata", this.filteredcatalogdata);
      console.log('allcatalogdata', this.AllcatalogData)
    });

    this.vendorservice.getVendors().subscribe((res: any) => {
      this.vendorData = res;
      this.vendorData1 = this.vendorData.filter((item: any) => {
        return this.manufacturerNames.some((fiteritem: any) => {
          return fiteritem.manufacturerId === item.manufacturerId
        })

      })
      this.selectedvendors = this.vendorData1;
      this.v1 = this.selectedvendors.map((item: any) => {
        return this.updateproductform.push(this.fb.group({
          manufacturerId: item.manufacturerId,
         
        }));
      });
      console.log('filtervendordata', this.selectedvendors);
      console.log(this.updateproductform.value);
    })
  }



  get catalog(): FormArray {
    console.log('get selectedCatalogs called');
    return this.updateproductform.get('catalog') as FormArray;
  }

  onSelectCatalogs(i: any) {

    console.log("onSelectCatalogs Called", this.selectedCatalogVals);
    console.log('selectedcatalogid', this.selectedcatalogid = this.AllcatalogData[i].catalogId);
    this.currentcatalogs = this.selectedCatalogVals.filter((item: any) => item.catalogId !== this.selectedcatalogid);
    if (this.selectedCatalogVals >= this.catalogsdata) {
      this.catalog.push(this.fb.group({
        catalogId: this.selectedcatalogid,
        primaryFlg: new FormControl('Y'),

      }));
      console.log('if  part called')
    }
    else {
      if (this.selectedCatalogVals < this.catalogsdata) {
         this.catalog.clear()
        this.currentcatalogs.forEach((item: any) => {
          this.catalog.push(this.fb.group({
            catalogId: new FormControl(item.catalogId),
            primaryFlg: new FormControl('Y'),
          }));
        });

        console.log('else called');
      }
    }
    console.log(this.updateproductform.value)
}

// selectVendorname(i:any){
//   this.abc=this.selectedvendors[i].manufacturerId
// console.log('abc',this.abc);
// this.updateproductform.push(this.fb.group({
//   manufacturerId:this.abc
// }))


// console.log('form',this.updateproductform.value);
// }
  saveUpdateProduct() {

    this.productservice.updateProductById(this.productId, this.updateproductform.value).subscribe((data => {

      console.log('submitted form', this.updateproductform.value);
      this.dialogRef.close();
      alert('Product Successfully Updated');
    })
      , errorMsg => {
        alert('Something Went Wrong')
      })

  }



  onSubmit() {
    this.saveUpdateProduct();
  }




  





}




