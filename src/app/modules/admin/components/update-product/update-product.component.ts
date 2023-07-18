/*
 *   Copyright (c) 2023 Dmantz Technologies Pvt ltd
 *   All rights reserved.
 */
import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';


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
  catalogsdata: any;
  selectedCatalogVals: any;
  searchTags: any;
  vendorData: any;
  AllcatalogData: any;
  filtervendordata: any
  filteredcatalogdata: any;
  selectedcatalogid: any
  selectedvendors: any;
  slectedobjectfield: any[] = [];



  AllcatalogData$:Observable<any>
  constructor(private productservice: ProductDataService, private activate: ActivatedRoute, private route: Router, @Inject(MAT_DIALOG_DATA) public data: any, private vendorservice: VendorDataService, private fb: FormBuilder) {
    this.updateproductform = this.fb.group({
      productName: new FormControl(''),
      manufacturerId: new FormControl(''),
      productId: new FormControl(''),
      productDesc: new FormControl(''),
      searchTag: new FormControl(''),
      storeId: new FormControl(''),
      catalog: new FormArray([])
    })

  }

  ngOnInit(): void {

    // this.AllcatalogData$ = this.vendorservice.getData();
    console.log('async',this.AllcatalogData$);
    this.productId = this.data.productId;
    console.log(this.productId)
    this.productservice.getProductById(this.productId).subscribe((res => {
      this.productdata = res;
      this.catalogsdata = this.productdata.catalog;
     
      console.log('nested catalogdata', this.catalogsdata);
    }));

    
    this.vendorservice.getAllCatalogs().subscribe((data:any) => {
      this.AllcatalogData = data;
      this.filteredcatalogdata = this.AllcatalogData.filter((item: any) => {
        return this.catalogsdata.some((fiteritem: any) => {
          return fiteritem.catalogId === item.catalogId
        })
      })
      this.selectedCatalogVals = this.filteredcatalogdata;
      console.log("filteredcatalogdata", this.filteredcatalogdata);
      console.log('allcatalogdata', this.AllcatalogData)
    });

    this.vendorservice.getVendors().subscribe((res => {
        this.vendorData = res;
        // this.filtervendordata = this.productdata.manufacturerName;
        // console.log('rajiiiiiii', this.slectedobjectfield.push(this.filtervendordata));
        // console.log('filtervendordata', this.slectedobjectfield);
        // this.selectedvendors=this.slectedobjectfield;
      
    }))


  }



  get catalog(): FormArray {
    console.log('get selectedCatalogs called');
    return this.updateproductform.get('catalog') as FormArray;
  }

  onSelectCatalogs() {
   
    console.log("onSelectCatalogs Called", this.selectedCatalogVals);
  
      for  (let i =0; i < this.selectedCatalogVals.length; i++) {
        this.selectedcatalogid = this.selectedCatalogVals[i].catalogId;
        console.log('selectedcatalogid', this.selectedcatalogid);
      }
     
        console.log('if part called')
      this.catalog.push(this.fb.group({
        catalogId: this.selectedcatalogid,
        primaryFlg: new FormControl('Y'),
        productCatalogId: new FormControl(),
        catalogName: new FormControl(),
        parent: new FormControl(),
  
      }));
    
 
  


  }


  saveUpdateProduct() {
    this.productservice.updateProductById(this.productId, this.updateproductform.value).subscribe((data => {
      console.log('updatemethod called',data);
      console.log('submitted form',this.updateproductform.value);
    }))
  }



  onSubmit() {
    this.saveUpdateProduct();
  }


 
}
