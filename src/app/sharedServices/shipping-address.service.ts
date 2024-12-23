/*
 *   Copyright (c) 2023 Dmantz Technologies private limited
 *   All rights reserved.
 */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ShippingAddress, ShippingAddressRes, RazorPayOrder, RazorPayOrderRes } from 'src/app/data/hero';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ShippingAddressService {
  shippingAdd: ShippingAddress[] = [];
  clickedAddress;
  constructor(private _http: HttpClient, private router: Router) { }
  addShippingAddressBE(shippingAddress: ShippingAddress) {
    console.log(shippingAddress);
    const httpOptions = {
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

    return this._http.post<ShippingAddressRes>(environment.addShippingAddressUrl, shippingAddress, httpOptions).pipe();
  }
  getShippingAddressesBE(userId: any) {

    return this._http.get<ShippingAddress[]>(environment.getShippingAddressesUrl + userId).pipe();
  }

  getShippingAddressesById(userId: any) {

    return this._http.get<ShippingAddress[]>(environment.getShippingAddressesUrl + userId).pipe();
  }
  getShippingAddressBEResult() {
    var customerId = "102";
    this.getShippingAddressesBE("102").subscribe(
      (addresses) => {

        this.shippingAdd = <ShippingAddress[]>addresses;
        console.log(this.shippingAdd);
      },
      error => console.log(error)
    );
  }
  createRazorPayOrderBE(razorPayOrder: RazorPayOrder) {
    console.log(razorPayOrder);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'responseType': 'text,application/json',
        'Access-Control-Allow-Origin': 'http://192.168.100.27:8080',
        'Access-Control-Allow-Methods': "DELETE, POST, GET, OPTIONS",
        'Access-Control-Allow-Headers': 'Content-Type,application/json',
        'Authorization': 'my-auth-token'


      })
    };
    return this._http.post<RazorPayOrder>(environment.createRazorPayOrderUrl, razorPayOrder, httpOptions)
  }

  DeleteShippingAddressById(shippingAddressId: number) {

    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })

    };
    console.log("options are. ", options);
    console.log("delShippAddrUrl is. ", environment.delShippAddrUrl + shippingAddressId, options);
    return this._http.delete<any>(environment.delShippAddrUrl + shippingAddressId, options).pipe();

  }
}
