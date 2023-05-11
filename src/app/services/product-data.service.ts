import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../data/data-objects';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ProductDataService {
  productForm=FormGroup;
  product!: Product;
  constructor(private httpclient:HttpClient) { }

  getProducts(): Observable<Product[]>{
    return this.httpclient.get<Product[]>(environment.getAllProductsURL)
  }



  addProduct(productForm: any):Observable<any>{
   
    
    // const headers = new HttpHeaders()
    // .set('Authorization', 'my-auth-token')
    // .set('content-Type', 'application/json');
    return this.httpclient.post<Product>('http://localhost:8085/ecomm/addProduct',productForm);
  }

  getProductById(id: number): Observable<any>{
    return this.httpclient.get<any>(environment.getProductByIdURL + id)
  }

 
}
