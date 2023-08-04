/*
 *   Copyright (c) 2023 Dmantz Technologies Pvt ltd
 *   All rights reserved.
 */
import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ProductSkuServiceService } from '../product-sku-service.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductDataService } from '../services/product-data.service';
import { ProductSkuDataService } from '../services/productsku-data.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-product-sku',
  templateUrl: './product-sku.component.html',
  styleUrls: ['./product-sku.component.scss']
})
export class ProductSkuComponent implements OnInit {

  id: any;
  isDisabled: boolean = true;
  AddproductSkuform: any;
  submitted: boolean = false;
  // productSku: ProductSku = new ProductSku();
  productSku: any
  snackBar: any;
  constructor(private produSku: ProductSkuServiceService, private route: ActivatedRoute, private dialogRef: MatDialogRef<ProductSkuComponent>,
    private router: Router, private productdataservice: ProductDataService, private productSkudataservice: ProductSkuDataService, private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: any, private dialog: MatDialog) {
    console.log(this.id = data.productId)

    this.AddproductSkuform = this.fb.group({
      Skuid: new FormControl(''),
      price: ['', Validators.compose([Validators.required, Validators.pattern(/^[0-9]*$/)])],
      Skucode: ['', Validators.compose([Validators.required])],
      count: ['', [Validators.required, Validators.pattern(/^[0-9]*$/)]],
      Discount: ['', [Validators.required, Validators.pattern(/^[0-9]*$/)]],
      Description: ['', Validators.required],
      barcode: ['', [Validators.required]],
      productId: ['', Validators.required],
      status: ['', Validators.required],
      selfLocCd: ['', [Validators.required]],
    });
  }



  ngOnInit(): void {
    // this.id = this.route.snapshot.paramMap.get("productId");

    console.log(this.id);
    this.productdataservice.getProductById(this.id).subscribe(data => {
      this.productSku = data;
      console.log(data)
      console.log(this.productSku)


    })
  }


  saveProductSku() {
    this.produSku.createProductSku(this.productSku).subscribe((data: any) => {
      console.log('add product sku', this.productSku);

      alert('product Sku added successfully')
    },
      error => console.log(error));


  }

  onSubmit() {
    if (this.productSku.status === true) {
      this.productSku.status = 'Available';
    } else
      if (this.productSku.status === false) {
        this.productSku.status = 'Not-Available'
      }
    console.log(this.productSku);
    this.submitted = true;
    if (this.AddproductSkuform.valid) {
      this.saveProductSku()
      setTimeout(() => {
        this.AddproductSkuform.reset();
       this.snackBar.open('Form submitted successfully!', 'Close', {
          duration: 4000,
        });
      }, 2000); 
    }
  }
//  this.router.navigate(['/admin/products/:productId', this.productSku])
  // cancel() {
  //   this.router.navigate(['/admin/products/:productId', this.productSku])
  // }
  get form() {
    return this.AddproductSkuform.controls;
  };

}



