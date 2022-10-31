import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../data/data-objects';

@Injectable({
  providedIn: 'root'
})
export class ProductDataService {

  constructor(private httpclient:HttpClient) { }

  getProducts(): Observable<Product[]>{
    return this.httpclient.get<Product[]>(environment.getAllProductsURL)
  }

  addProduct(product: Product): Observable<any>{
    return this.httpclient.post<any>(environment.saveProductURL,product);
  }

  getProductById(id: number): Observable<Product>{
    return this.httpclient.get<Product>(environment.getProductByIdURL + id)
  }
}
