import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductSku } from './product-sku';

@Injectable({
  providedIn: 'root'
})
export class ProductSkuServiceService {

private addProductSku="http://localhost:8085/addproductsku";

  constructor(private http:HttpClient) { }
  createProductSku(productSku:ProductSku): Observable<Object>

  {
return this.http.post(`${this.addProductSku}`,productSku);
  }
}
