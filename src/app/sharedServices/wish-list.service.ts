/*
 *   Copyright (c) 2023 Dmantz Technologies private limited
 *   All rights reserved.
 */
import { Injectable } from '@angular/core';
import { Product, WishList, WishListSku } from '../data/hero';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppService } from './app.service';

@Injectable({
  providedIn: 'root'
})
export class WishListService {
  wishlistURL = "/assets/newwishlistData.json";
  wish: WishList;
  favourite: number[] = [];
  constructor(private router: Router, private _http: HttpClient, private _appService: AppService) { }
  //add to wishlist
  addToWishlist(skuId: number, userId: number) {
    console.log("sku_id in wishlist service is. ", skuId);
    const body = { "userId": userId, "productSkuId": skuId }
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'responseType': 'text',
        'Access-Control-Allow-Origin': 'http://localhost:8080',
        'Access-Control-Allow-Methods': "DELETE, POST, GET, OPTIONS",
        'Access-Control-Allow-Headers': 'Content-Type,application/json',
        'Authorization': 'my-auth-token'
      })
    };
    return this._http.post<any>(environment.addToWishListUrl, body, options).pipe();
  }
  createWishListBE(productSkuId, userId) {
    let data = {
      "userId": userId,
      "productSkuId": productSkuId
    }
    let body = JSON.stringify(data);

    console.log("body is. ", body);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'responseType': 'text',
        'Access-Control-Allow-Origin': 'http://localhost:8080',
        'Access-Control-Allow-Methods': "DELETE, POST, GET, OPTIONS",
        'Access-Control-Allow-Headers': 'Content-Type,application/json',
        'Authorization': 'my-auth-token'
      }),
      body:
      {
        userId: userId,
        productSkuId: productSkuId
      }
    };
    return this._http.post<any>(environment.addToWishListUrl, httpOptions).pipe();
  }
  //Getting wishlist data
  getWishlist(userId: number) {

    console.log('Entered into getwishlist service')
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'responseType': 'text,application/json',
        'Access-Control-Allow-Origin': 'http://localhost:8080',
        'Access-Control-Allow-Methods': "DELETE, POST, GET, OPTIONS",
        'Access-Control-Allow-Headers': 'Content-Type,application/json',
        'Authorization': 'my-auth-token'

      })
    };
    console.log("environment.getWishlistUrl is. ", options);
    return this._http.get<WishListSku[]>(environment.getWishlistUrl + userId, options).pipe();
  }
  //remove from wishlist 
  removeFromWishlist(userId: number, skuId: number) {

    console.log("productSkuId is. ", skuId);
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'responseType': 'text',
        'Access-Control-Allow-Origin': 'http://localhost:8080',
        'Access-Control-Allow-Methods': "DELETE, POST, GET, OPTIONS",
        'Access-Control-Allow-Headers': 'Content-Type,application/json',
        'Authorization': 'my-auth-token'
      }),
      body: {
        userId: userId,
        productSkuId: skuId
      }

    };
    console.log("options are. ", options);
    return this._http.delete<any>(environment.delWishlistUrl, options).pipe();

  }

  getWishlistDetails(userId) {
    console.log("userId in getWishlistDetails() in wishlistservice is. ", userId);
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'responseType': 'text,application/json',
        'Access-Control-Allow-Origin': 'http://localhost:8080',
        'Access-Control-Allow-Methods': "DELETE, POST, GET, OPTIONS",
        'Access-Control-Allow-Headers': 'Content-Type,application/json',
        'Authorization': 'my-auth-token'

      })

    };
    console.log("getWishlistUrl is. ", environment.getWishlistDetailsUrl + userId);
    return this._http.get<any>(environment.getWishlistDetailsUrl + userId, options);
  }

  getFavourites(userId: number) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'responseType': 'text,application/json',
        'Access-Control-Allow-Origin': 'http://localhost:8080',
        'Access-Control-Allow-Methods': "DELETE, POST, GET, OPTIONS",
        'Access-Control-Allow-Headers': 'Content-Type,application/json',
        'Authorization': 'my-auth-token'
      })
    };
    return this._http.get<number[]>(environment.getFavouritesUrl + userId, options);

  }

}
