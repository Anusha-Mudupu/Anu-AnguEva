/*
 *   Copyright (c) 2023 Dmantz Technologies Pvt ltd
 *   All rights reserved.
 */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product, option } from '../data/data-objects';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ProductDataService {
  productForm=FormGroup;
  product!: Product;
  constructor(private httpclient:HttpClient) { }

  getProducts(): Observable<Product[]>{
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
    return this.httpclient.get<Product[]>(environment.getAllProductsURL,httpOptions)
  }



  addProduct(productForm: any):Observable<any>{
   
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
    // const headers = new HttpHeaders()
    // .set('Authorization', 'my-auth-token')
    // .set('content-Type', 'application/json');
    return this.httpclient.post<Product>(environment.addproduct,productForm,httpOptions);
  }

  getProductById(id: number): Observable<any>{
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
    return this.httpclient.get<any>(environment.getProductByIdURL + id,httpOptions)
  }
  updateProductById(id:number,product:Product){
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
    return this.httpclient.put<any>(environment.updateproduct + id,product,httpOptions);
  }
 


  getAllOptionNames(){
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
    return this.httpclient.get<option>(environment.getOptionsOnProdcut,httpOptions);
  }
}
