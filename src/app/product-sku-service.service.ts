/*
 *   Copyright (c) 2023 Dmantz Technologies Pvt ltd
 *   All rights reserved.
 */
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
    const httpOptions = {
      headers :new HttpHeaders({
        'Content-Type':'application/json',
        'Accept':'application/json',
        'responseType':'text,application/json',              
        'Access-Control-Allow-Origin':'http://localhost:8085',
        'Access-Control-Allow-Methods':"DELETE, POST, GET, OPTIONS",
        'Access-Control-Allow-Headers':'Content-Type,application/json',
        'Authorization':'my-auth-token' 
      })
    };
    return this.http.post(`${this.addProductSku}`, productSku,httpOptions);
  }

  addImageToProduSku(_productSkuImage: ProductSkuImage): Observable<Object> {
    const httpOptions = {
      headers :new HttpHeaders({
        'Content-Type':'application/json',
        'Accept':'application/json',
        'responseType':'text,application/json',              
        'Access-Control-Allow-Origin':'http://localhost:8085',
        'Access-Control-Allow-Methods':"DELETE, POST, GET, OPTIONS",
        'Access-Control-Allow-Headers':'Content-Type,application/json',
        'Authorization':'my-auth-token' 
      })
    };
    return this.http.post(`${this.addProductSkuImage}`, _productSkuImage,httpOptions);
  }


     

}
  
