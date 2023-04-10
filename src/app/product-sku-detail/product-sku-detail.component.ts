import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductSku } from '../product-sku';
import { ProductSkuServiceService } from '../product-sku-service.service';
import { ProductSkuDataService } from '../services/productsku-data.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-sku-detail',
  templateUrl: './product-sku-detail.component.html',
  styleUrls: ['./product-sku-detail.component.scss']
})
export class ProductSkuDetailComponent implements OnInit {
  productSku: ProductSku = new ProductSku()
  id: any;
  isDisabled: boolean = true;
  Available = 'Available';
  NotAvailable = 'Not-Available';
  constructor(private router: Router, private route: ActivatedRoute, private productskuservice: ProductSkuServiceService, private productSkuDataservice: ProductSkuDataService) { }

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

    this.id = this.route.snapshot.params['productSkuId']
    console.log(this.id)
    this.productSkuDataservice.getProductSkuByID(this.id).subscribe(
      (response) => {
        this.productSku = response[0];
        console.log(this.productSku);
      })
  }

  saveUpdateProductSku() {

    this.productSkuDataservice.upDateProductSkuById(this.id, this.productSku).subscribe(data => {
      console.log(data);
      alert('successfully updated');
    })
  }

  onSubmit() {
    this.saveUpdateProductSku()

  }


  cancel() {
    this.router.navigate(['/admin/products/:productId',this.productSku])
  }

}
