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

  selectedvendors: any;
  filtervendordata: any;

  manufacturerNames: string[] = [];
  manufacturerObject: any;

  currentVendor: any;
  optionNamesdata: any;
  selectedOptionNames: any;
  filteredOptionNames: any;
  productOptionNamesdata: any;
  selectedOptionName: any;
  currentOptionName: any;
  optionNames: any;
  constructor(private productservice: ProductDataService, @Inject(MAT_DIALOG_DATA) public data: any, private vendorservice: VendorDataService, private fb: FormBuilder, public dialogRef: MatDialogRef<UpdateProductComponent>,) {
    this.updateproductform = this.fb.group({
      productName: new FormControl('', [Validators.required]),
      manufacturerId: new FormControl('', [Validators.required]),
      productId: new FormControl('', [Validators.required]),
      productDesc: new FormControl('', [Validators.required]),
      searchTag: new FormControl('', [Validators.required]),
      storeId: new FormControl('', [Validators.required]),
      catalog: new FormArray([]),
      productOption: new FormArray([])
    });


  }

  ngOnInit(): void {
    this.productId = this.data.productId;
    console.log(this.productId)
    this.productservice.getProductById(this.productId).subscribe((res => {
      this.productdata = res;
      this.catalogsdata = this.productdata.catalog;
      this.productOptionNamesdata = this.productdata.productOption;
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
      this.filtervendordata = this.vendorData.filter((item: any) => {
        return this.manufacturerNames.some((fiteritem: any) => {
          return fiteritem.manufacturerId === item.manufacturerId
        })

      })
      this.selectedvendors = this.filtervendordata;
      this.updateproductform.patchValue({
        manufacturerId: this.productdata.manufacturerId
      })

      console.log('filtervendordata', this.selectedvendors);
      console.log(this.updateproductform.value);
    });
    this.productservice.getAllOptionNames().subscribe((data: any) => {
      this.optionNamesdata = data;
      console.log('option names data', this.optionNamesdata);
      this.filteredOptionNames = this.optionNamesdata.filter((item: any) => {
        return this.productOptionNamesdata.some((fiteritem: any) => {
          return fiteritem.optionName === item.optionName
        })
      })
      this.selectedOptionNames = this.filteredOptionNames;
      this.optionNames = this.selectedOptionNames.map((item: any) => {
        return this.productOption.push(this.fb.group({
          optionName: item.optionName,
        }));
      });
    });

  }



  get catalog(): FormArray {
    console.log('get selectedCatalogs called');
    return this.updateproductform.get('catalog') as FormArray;
  }


  get productOption(): FormArray {
    return this.updateproductform.get('productOption') as FormArray
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

  onSelectVendor(i: any) {
    this.currentVendor = this.vendorData[i].manufacturerId
    console.log('currentVendor', this.currentVendor);
    this.updateproductform.patchValue({
      manufacturerId: this.currentVendor
    });
    console.log('form', this.updateproductform.value);
  }

  saveUpdateProduct() {
    this.productservice.updateProductById(this.productId, this.updateproductform.value).subscribe((data => {
      console.log('submitted form', this.updateproductform.value);
      this.dialogRef.close();
      alert('Product Successfully Updated');
    }), errorMsg => {
      alert('Something Went Wrong')
    })

  }
  onSubmit() {
    this.saveUpdateProduct();
  }



  getInputStyles() {
    return {
      'background-color': 'var(--toast-background)',
      'color': 'var(--toast-text)',
      // ... other styling properties
    };

  }

  onSelectOptionName(i: any) {
    console.log('onSelectOptionName called', this.selectedOptionNames);
    this.selectedOptionName = this.optionNamesdata[i].optionName;
    this.currentOptionName = this.selectedOptionNames.filter((item: any) => item.optionName !== this.selectedOptionName);

    if (this.selectedOptionNames > this.filteredOptionNames) {
      this.productOption.push(this.fb.group({
        optionName: this.selectedOptionName
      }));
      console.log('if part called')
    }
    else {

      this.productOption.clear();
      this.currentOptionName.forEach((option: any) => {
        this.productOption.push(this.fb.group({
          optionName: new FormControl(option.optionName)
        }))
      })

      console.log('else  part called')


    }
    console.log('updateproductform', this.updateproductform.value)



  }


}

