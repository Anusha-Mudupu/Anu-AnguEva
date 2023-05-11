import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductSku } from './product-sku';
import { ProductSkuImage } from './product-sku-image';

@Injectable({
  providedIn: 'root'
})
export class ProductSkuServiceService {

  private addProductSku = "http://localhost:8085/addproductsku";

  private addProductSkuImage = "http://localhost:8085/addImages";


  constructor(private http: HttpClient) { }
  createProductSku(productSku: ProductSku): Observable<Object> {
    return this.http.post(`${this.addProductSku}`, productSku);
  }

  addImageToProduSku(_productSkuImage: ProductSkuImage): Observable<Object> {
    return this.http.post(`${this.addProductSkuImage}`, _productSkuImage);
  }


     

}
  
