/*
 *   Copyright (c) 2023 Dmantz Technologies Pvt ltd
 *   All rights reserved.
 */
import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ProductSkuServiceService } from '../product-sku-service.service';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductDataService } from '../services/product-data.service';
import { ProductSkuDataService } from '../services/productsku-data.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-product-sku',
  templateUrl: './product-sku.component.html',
  styleUrls: ['./product-sku.component.scss']
})
export class ProductSkuComponent implements OnInit {
  //  existingSkuOptionsdata = [
  //   [{ optionName: 'color', optionValue: 'red', optionId: 2089, productSkuOptionsId: 0 }],
  //   // ... (other arrays)
  //   [{ optionName: 'color', optionValue: 'pink', optionId: 2091, productSkuOptionsId: 0 },
  //    { optionName: 'size', optionValue: 'm', optionId: 2092, productSkuOptionsId: 0 }]
  // ];

  id: any;
  isDisabled: boolean = false;
  AddproductSkuform: any;
  submitted: boolean = false;
  // productSku: ProductSku = new ProductSku();
  productSku: any
  snackBar: any;

  productOptionsdata: any;
  filteredOptions: any[] = [];
  filteredOptionValuesArray: any;

  currentOptionValue: any;
  selectedOptionValue: any;
  selectedOptionName: any;
  currentOptionValueId: any;
  currentOptionName: any;
  optionValues: any;
  existingOptions: any;
  errormsg: any;
  existingSkuOptionsdata: any;
  existingOptionsIds: any;
  errorMessageforoptions: any;
  allproductskudata: any;
  extractOptionIds: any
  optionIdsForEachArray: any;
  allOptionsMatched: any;
  allSkuOptionMatched: any;
 
  note: any;
  displayselectedOptionName: any=[];
  displayselectedOpValue:any=[];
  OPtionNameErrorMessage: any | null = null;
   abc:any;
  constructor(private produSku: ProductSkuServiceService, private route: ActivatedRoute, private dialogRef: MatDialogRef<ProductSkuComponent>,
    private router: Router, private productdataservice: ProductDataService, private productSkudataservice: ProductSkuDataService, private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: any, private dialog: MatDialog,private cdr: ChangeDetectorRef) {
    console.log(this.id = data.productId)

    this.AddproductSkuform = this.fb.group({
      Skuid: new FormControl(''),
      price: ['', Validators.compose([Validators.required, Validators.pattern(/^[0-9]*$/)])],
      productSkuCd: ['', Validators.compose([Validators.required])],
      count: ['', [Validators.required, Validators.pattern(/^[0-9]*$/)]],
      Discount: ['', [Validators.required, Validators.pattern(/^[0-9]*$/)]],
      skuDescription: ['', Validators.required],
      barcode: ['', [Validators.required]],
      productId: ['', Validators.required],
      status: ['', Validators.required],
      selfLocCd: ['', [Validators.required]],
      options: new FormArray([], [Validators.required])
    });
  }



  ngOnInit(): void {

    //  this.id = this.route.snapshot.paramMap.get("productId");
    console.log(this.id);
    this.productdataservice.getProductById(this.id).subscribe(data => {
      this.productSku = data;
      console.log(data)
      console.log(this.productSku)
    });

    this.productSkudataservice.getAllOptions(this.id).subscribe((data: any) => {
      this.productOptionsdata = data;
      console.log('alloptionsdata', this.productOptionsdata)
    });
    this.productSkudataservice.getAllProductSkus(this.id).subscribe((data: any) => {
      this.allproductskudata = data.map((id: any) => id.option);
      //  this.existingSkuOptionsdata = this.allproductskudata.find((a: any) => a)
      //  this.existingOptionsIds = this.existingSkuOptionsdata.map((id: any) => id.optionId);
      // console.log('existingOptionsIds', this.existingOptionsIds)
      // console.log('existingSkuOptionsdata', this.existingSkuOptionsdata)
      console.log('allproductskus', this.allproductskudata);
    })

  }

  extarctingoptionIds() {
    this.extractOptionIds = (arrayOfObjects: any) => {
      return arrayOfObjects.map((obj: any) => ({ optionId: obj.optionId }));
    };
    this.optionIdsForEachArray = this.allproductskudata.map((array: any) => this.extractOptionIds(array)).flat();
    console.log('test', this.optionIdsForEachArray)
  }



  getInputStyles() {
    return {
      'background-color': 'var(--toast-background)',
      'color': 'var(--toast-text)',
      // ... other styling properties
    };
  }

  saveProductSku() {
    this.produSku.createProductSku(this.AddproductSkuform.value).subscribe((data: any) => {
      console.log('add product sku', this.productSku);

      alert('product Sku added successfully')
    },
      error => {
        window.alert('Something Went Wrong');
      });


  }

  onSubmit() {
    const optionsArray = this.options.controls.map(control => control.value);
    this.allOptionsMatched = true;
    for (let option of optionsArray) {
      console.log('allOptionsMatched', this.allOptionsMatched);
      if (this.optionIdsForEachArray.some((skuOption: any) =>
        Object.keys(option).every(key => skuOption[key] === option[key])
      )) {
        this.allOptionsMatched = false;
        console.log('entered into otions for if', this.allOptionsMatched)
        // break;  // No need to continue checking once a mismatch is found
      }
      else {
        this.allOptionsMatched = true;
      }
    }
    this.allSkuOptionMatched = true;
    for (const skuOption of this.optionIdsForEachArray) {
      console.log('allSkuOptionMatched', this.allSkuOptionMatched);
      if (optionsArray.some((option: any) =>
        Object.keys(option).every(key => skuOption[key] === option[key])
      )) {
        this.allSkuOptionMatched = false;
        console.log('entered into sku for if', this.allSkuOptionMatched);
        // break;  // No need to continue checking once a mismatch is found
      }
      else {
        this.allSkuOptionMatched = true;
      }
    }

    if (!this.allOptionsMatched && !this.allSkuOptionMatched) {
      this.errormsg = 'Error: Options already exist for another SKU';
      this.options.clear();
    }
    else {
      if (this.allOptionsMatched && this.allSkuOptionMatched) {
        this.errormsg = '';
        console.log('submit else called');
      }
    }
    console.log('Before Conditions:', this.allOptionsMatched, this.allSkuOptionMatched);

    if (this.productSku.status === true) {
      this.productSku.status = 'Available';
    } else
      if (this.productSku.status === false) {
        this.productSku.status = 'Not-Available'
      }
    console.log(this.productSku);
    this.submitted = true;


    if (this.AddproductSkuform.valid && this.productOptionsdata.length == this.options.length) {
      this.saveProductSku()
    }
    // setTimeout(() => {
    //   this.AddproductSkuform.reset();
    //  this.snackBar.open('Form submitted successfully!', 'Close', {
    //     duration: 4000,
    //   });
    // }, 2000); 
    // this.dialogRef.close();
    else {
      if (this.productOptionsdata.length !== this.options.length) {
        this.errorMessageforoptions = 'Error:must select all product options'

      }
      else {
        this.errorMessageforoptions = '';
      }
    }
    console.log('form', this.AddproductSkuform.value);


  }
  //  this.router.navigate(['/admin/products/:productId', this.productSku])
  // cancel() {
  //   this.router.navigate(['/admin/products/:productId', this.productSku])
  // }
  get form() {
    return this.AddproductSkuform.controls;
  };




  get options(): FormArray {
    console.log('get selectedOptions called');
    return this.AddproductSkuform.get('options') as FormArray;
  }

  filterOptions(i: any) {
    if (this.selectedOptionName) {
      console.log('selectedoptionname', this.selectedOptionName)
      this.filteredOptions = this.productOptionsdata.filter((option: any) => option.optionName == this.selectedOptionName);
      console.log('filteredoptiondata', this.filteredOptions);
      this.currentOptionName = this.selectedOptionName;
      console.log('currentOptionName', this.currentOptionName);
    }
    this.filteredOptionValuesArray = this.filteredOptions.find((item: any) => item.optionValue)
    this.optionValues = this.filteredOptionValuesArray.optionValue;
    //  this.currentOptionValue=this.optionValues[i].optionValue;
    console.log('filteredOptionValues', this.filteredOptionValuesArray);
    console.log('optionValues', this.optionValues);
    if (i >= 0 && i < this.productOptionsdata.length) {
      const selectedOption = this.productOptionsdata[i].optionName;

      // Check for duplicates
      if (!this.displayselectedOptionName.includes(selectedOption)) {
        this.displayselectedOptionName.push(selectedOption);
        this.OPtionNameErrorMessage = null; // Clear any previous error message
        this.isDisabled = false;
      } else {
        this.OPtionNameErrorMessage = 'Error:OptionName Already Selected';
        this.isDisabled = true;
       
      }
     
    }

  }

  currentSelectedOptionValue(i: any) {

    console.log('selectedoptionvalues', this.selectedOptionValue);
    this.currentOptionValueId = this.optionValues[i].optionId;
    this.currentOptionValue = this.optionValues[i].optionValue;
    console.log('currentoptionvalueid', this.currentOptionValueId);
    console.log('currentoptionvalue', this.currentOptionValue);
    this.extarctingoptionIds();

    // Check if options already exist in any productSku
    // this.existingOptions = this.optionIdsForEachArray.some((product: any) => product == this.currentOptionValue);
    this.options.push(this.fb.group({
      optionId: this.currentOptionValueId,
    }));
    console.log('form', this.AddproductSkuform.value);
    this.note = 'If you want to Change the selcted Option Value,then Click on the Clear button and Select Another option'
    if (i >= 0 && i < this.optionValues.length) {
      const selectedOptionValue= this.optionValues[i].optionValue;
         
      // Check for duplicates
      if (!this.displayselectedOpValue.includes(selectedOptionValue)) {
        this.displayselectedOpValue.push(selectedOptionValue);
        }
    }
  }




  clearSelection() {
    // this.selectedOptionName = null;
    this.selectedOptionValue = null;
  
    this.options.removeAt(this.selectedOptionValue)
    console.log('form', this.AddproductSkuform.value);
    this.note = '';
    this.cdr.detectChanges();
  }
  // clearoptionName() {
  //   this.selectedOptionName = null;
  //    this.isDisabled = false;
  //   this.OPtionNameErrorMessage = ''

  // }

}





