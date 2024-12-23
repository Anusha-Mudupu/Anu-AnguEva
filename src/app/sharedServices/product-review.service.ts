/*
 *   Copyright (c) 2023 Dmantz Technologies private limited
 *   All rights reserved.
 */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProductReview } from '../data/hero';

@Injectable({
  providedIn: 'root'
})
export class ProductReviewService {
  procutReviewUrl = "/assets/productReview.json"
  constructor(private _http: HttpClient) { }

  public submitReview(formData: ProductReview): Observable<any> {
    console.log('entered into product review service')
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'responseType': 'text',
        'Access-Control-Allow-Origin': 'http://localhost:8080',
        'Access-Control-Allow-Methods': "DELETE,POST,GET,OPTIONS",
        'Access-Control-Allow-Headers': 'Content-Type :application/json',
        'Authorization': 'my-auth-token'

      })
    };
    console.log("In submitReview service: ", formData);
    return this._http.post<ProductReview>(environment.addrating_Url, formData, httpOptions).pipe();
  }


  public getReview(userId?: any) {
    console.log('Enterd into getReview mehtod', userId);
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'responseType': 'text,application/json',
        'Access-Control-Allow-Origin': 'http://localhost:8080',
        'Access-Control-Allow-Methods': "DELETE, POST, GET, OPTIONS",
        'Access-Control-Allow-Headers': 'Content-Type,application/json',
        'Authorization': 'my-auth-token'

      }),
    };
    console.log("http://localhost:8080/ec/getReview?productSkuId=", options)

    return this._http.post<any>(environment.getReviewUrl + userId, options).pipe();
  }

  public getAllReviews() {
    console.log("Get all reviews service called");
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'responseType': 'text,application/json',
        'Access-Control-Allow-Origin': 'http://localhost:8080',
        'Access-Control-Allow-Methods': "DELETE, POST, GET, OPTIONS",
        'Access-Control-Allow-Headers': 'Content-Type,application/json',
        'Authorization': 'my-auth-token'

      }),
    };
    return this._http.get<any>(environment.getAllReviewsUrl, options).pipe();
  }


}
