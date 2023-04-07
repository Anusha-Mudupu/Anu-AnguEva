import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductSku } from '../product-sku';
import { ProductSkuServiceService } from '../product-sku-service.service';
import {  FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductDataService } from '../services/product-data.service';


@Component({
  selector: 'app-product-sku',
  templateUrl: './product-sku.component.html',
  styleUrls: ['./product-sku.component.scss']
})
export class ProductSkuComponent implements OnInit {

  constructor(private produSku: ProductSkuServiceService, private route: ActivatedRoute,
    private router: Router,private productdataservice:ProductDataService ) { }

  AddproductSkuform = new FormGroup({
    Skuid: new FormControl('', Validators.compose([Validators.required])),
    price: new FormControl('', Validators.compose([Validators.required])),
    Skucode: new FormControl('', Validators.compose([Validators.required])),
    count: new FormControl('', Validators.compose([Validators.required])),
    Discount: new FormControl('', Validators.compose([Validators.required])),
    Description: new FormControl('', Validators.compose([Validators.required])),
    barcode: new FormControl('', Validators.compose([Validators.required,Validators.minLength(6)])),
    productId:new FormControl('',Validators.compose([Validators.required])),
    status:new FormControl('',Validators.compose([Validators.required]))
  })


  Available:any;
  NotAvailable:any;
  id: any;
  isDisabled:boolean=true;

productSku: ProductSku = new ProductSku();

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get("productId");
 
   console.log(this.id);
   this.productdataservice.getProductById(this.id).subscribe(data=>{
    this.productSku=data;
    this.productSku.status=data;

    console.log(data)
    console.log("this.productSku:", this.productSku.status)

  })
 }


  saveProductSku() {
 this.produSku.createProductSku(this.productSku).subscribe(data => {
      console.log(data);
   alert('product Sku added successfully')
    },
      error => console.log(error));
    }

  onSubmit() {
    console.log(this.productSku);
    this.saveProductSku();
     this.router.navigate(['/admin/products/:productId',this.productSku])
    console.log(this.AddproductSkuform)
    }
    
  cancel() {
    this.router.navigate(['/admin/products/:productId', this.productSku])
  }

  get form() {
    return this.AddproductSkuform.controls;
  }
}



