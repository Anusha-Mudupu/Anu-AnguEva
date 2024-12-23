import { Injectable, Directive } from '@angular/core';
import { Skus, Product, FilterCriteria, FilterCriteriaObj } from '../../app/data/hero';
import { Input } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Directive()
@Injectable({
  providedIn: 'root'
})
export class ProductDetailService {

  @Input() currentTileProduct: Product;
  private id;
  private inputParam1: FilterCriteriaObj;
  constructor(private _http: HttpClient) { }
  ngOnInIt() {
    console.log(this.currentTileProduct);
    this.id = this.currentTileProduct.productId;
  }
  getProductDetail(id) {
    console.log(this.id);
    console.log("productimage was selected");
    return this._http.get<any>(environment.productDetailListUrl).pipe();

  }

  getProductsById(inputParam?: FilterCriteriaObj, skuid?: number) {

    this.inputParam1 = inputParam;

    console.log("get product details by id service called", inputParam, this.inputParam1);

    const httpBody = {
      'filterCriteria': {
        'filterType': this.inputParam1.filterCriteria.filterEnabled,
        'filterValue': this.inputParam1.filterCriteria.catalogId,
      }
    };
    console.log(httpBody);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'responseType': 'text',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': "DELETE, POST, GET, OPTIONS",
        'Access-Control-Allow-Headers': 'Content-Type,application/json',
        'Authorization': 'my-auth-token'

      }),

    };
    console.log(environment.productDetailListUrl, httpBody, httpOptions);
    return this._http.post(environment.productDetailListUrl, httpBody, httpOptions).pipe();

  }



}
