/*
 *   Copyright (c) 2023 Dmantz Technologies private limited
 *   All rights reserved.
 */
import { Injectable } from '@angular/core';
import { ShippingAddress } from 'src/app/data/hero';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { ShippingAddressService } from 'src/app/sharedServices/shipping-address.service';
import { Observable } from 'rxjs';
import { AppService } from './app.service';
import { GetOrderInfoServiceService } from './get-order-info-service.service';

@Injectable({
  providedIn: 'root'
})
export class ShippingAddressResolverService implements Resolve<ShippingAddress[]> {

  constructor(private shippingAddressService: ShippingAddressService, private _appService: AppService, private _getOrderServiceInfo: GetOrderInfoServiceService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ShippingAddress[]> {
    // this below only line is added by shashikanth in 20-jan-2022
    if (!localStorage.getItem("user")) return null;
    else {
      var userId = parseInt(localStorage.getItem("userId"));
      console.log("userId in ShippingAddressResolverService.ts ", userId);
      return this.shippingAddressService.getShippingAddressesBE(userId);
    }

  }
}
