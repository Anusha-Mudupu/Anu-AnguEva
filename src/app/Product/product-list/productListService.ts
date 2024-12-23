/*
 *   Copyright (c) 2023 Dmantz Technologies private limited
 *   All rights reserved.
 */
import { Injectable } from '@angular/core';
import { shareReplay } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Child, NavigationList, DropdownSvcParams, FilterCriteria, Product, FilterCriteriaObj } from '../../data/hero';
import { MessagesService } from '../../sharedServices/messages.service';
import { EventEmitter } from 'events';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProductListService {
  private _filterCriteriaParam: FilterCriteriaObj;

  $productDetails = new EventEmitter();
  products: Product[];
  constructor(private _http: HttpClient, private messageService: MessagesService) { }
  getProductList(inputParam: FilterCriteriaObj) {
    console.log(inputParam);
    this._filterCriteriaParam = inputParam;

    const httpOptions = {

      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'responseType': 'text',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': "DELETE, POST, GET, OPTIONS",
        'Access-Control-Allow-Headers': 'Content-Type,application/json',
        'Authorization': 'my-auth-token'

      })
    };
    
   
    return this._http.post<Product[]>(environment.ProductListUrl, inputParam, httpOptions).pipe();
  }
  productDetail() {
   
  }

}

