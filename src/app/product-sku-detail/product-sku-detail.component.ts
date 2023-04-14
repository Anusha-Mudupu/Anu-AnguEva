import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductSku } from '../product-sku';
import { ProductSkuServiceService } from '../product-sku-service.service';
import { ProductSkuDataService } from '../services/productsku-data.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { ProductSkuImage } from '../product-sku-image';
@Component({
  selector: 'app-product-sku-detail',
  templateUrl: './product-sku-detail.component.html',
  styleUrls: ['./product-sku-detail.component.scss']
})
export class ProductSkuDetailComponent implements OnInit {
  // productSku: ProductSku = new ProductSku()
  productSku:any
  id: any;
  id2:any;
  isDisabled: boolean = true;

  imageBaseUrl:any;
 

  constructor(private domSanitizer: DomSanitizer, private httpClient: HttpClient, private router: Router, private route: ActivatedRoute, private productskuservice: ProductSkuServiceService, private productSkuDataservice: ProductSkuDataService) { }

  // onSelect()
  // {
  //   this.router.navigate(["/admin/product-sku-detail",this.id]);

  // }
  Updateform = new FormGroup({
    productSkuId: new FormControl('', Validators.compose([Validators.required])),
    price: new FormControl('', Validators.compose([Validators.required])),
    productSkuCd: new FormControl('', Validators.compose([Validators.required])),
    count: new FormControl('', Validators.compose([Validators.required])),
    Discount: new FormControl('', Validators.compose([Validators.required])),
    barcode: new FormControl('', Validators.compose([Validators.required])),
    Description: new FormControl('', Validators.compose([Validators.required])),
    productId: new FormControl('', Validators.compose([Validators.required])),
    status: new FormControl('', Validators.compose([Validators.required])),
  })

  ngOnInit(): void {
// this.imageBaseUrl=environment.imageBaseUrl;
this.id = this.route.snapshot.params['productSkuId']
    console.log(this.id)
    this.productSkuDataservice.getProductSkuByID(this.id).subscribe(
      (response) => {
        this.productSku = response[0];
       console.log(this.productSku);
       console.log(this.productSku.imageUrl);
       this.imageBaseUrl= environment.imagesBaseUrl + this.productSku.imageUrl;
       console.log(this.imageBaseUrl)
      });

      
     }







  saveUpdateProductSku() {
 
    this.productSkuDataservice.upDateProductSkuById(this.id, this.productSku).subscribe(data => {
      console.log(data);
      alert('successfully updated');
    })
  }

  onSubmit() {
    if(this.productSku.status===true){
      this.productSku.status='Available'
    }
    else
    if(this.productSku.status===false){
      this.productSku.status='Not-Available'
    }
    this.saveUpdateProductSku()
    this.router.navigate(['/admin/products/:productId',this.productSku])
  }


  cancel() {
    this.router.navigate(['/admin/products/:productId',this.productSku])
    alert('Youre Changes are not saved Do you Want to Cancel It ');
  }

}
