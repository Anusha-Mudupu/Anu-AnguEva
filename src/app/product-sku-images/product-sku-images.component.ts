import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductSkuImage } from '../product-sku-image';
import { ProductSkuServiceService } from '../product-sku-service.service';
import { ProductSkuDataService } from '../services/productsku-data.service';

@Component({
  selector: 'app-product-sku-images',
  templateUrl: './product-sku-images.component.html',
  styleUrls: ['./product-sku-images.component.scss']
})
export class ProductSkuImagesComponent implements OnInit {

  constructor(private prodSKu:ProductSkuServiceService,private route: ActivatedRoute,private productskudataservice:ProductSkuDataService) { }

  productSkuImage: ProductSkuImage=new ProductSkuImage();
  id:any;
 

  ngOnInit(): void {
    this.id=this.route.snapshot.paramMap.get('productSkuId');

   

  }
  saveProductSkuImage()
  {
    this.prodSKu.addImageToProduSku(this.productSkuImage).subscribe(data =>
      {
console.log(data);
      },
      error => console.log(error));
  }
  onSubmit()
  {
console.log(this.productSkuImage);
console.log(this.id);


this.saveProductSkuImage();
  }


  

}
