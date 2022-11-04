import { Component, OnInit } from '@angular/core';
import { ProductSku } from '../product-sku';
import { ProductSkuServiceService } from '../product-sku-service.service';

@Component({
  selector: 'app-product-sku',
  templateUrl: './product-sku.component.html',
  styleUrls: ['./product-sku.component.scss']
})
export class ProductSkuComponent implements OnInit {

  constructor(private produSku:ProductSkuServiceService) { }

  productSku: ProductSku=new ProductSku();

  ngOnInit(): void {
  }
  saveProductSku()
  {
    this.produSku.createProductSku(this.productSku).subscribe(data =>
      {
console.log(data);
      },
      error => console.log(error));
  }
  onSubmit()
  {
    console.log(this.productSku);
    this.saveProductSku();
  }

}
