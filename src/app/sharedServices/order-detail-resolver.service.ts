/*
 *   Copyright (c) 2023 Dmantz Technologies private limited
 *   All rights reserved.
 */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { throwToolbarMixedModesError } from '@angular/material';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Order, vieworders } from '../data/hero';
import { AppService } from './app.service';
import { GetOrderInfoServiceService } from './get-order-info-service.service';
import { OrderService } from './order.service';

@Injectable({
  providedIn: 'root'
})
export class OrderDetailResolverService implements Resolve<any>{
  private orderDetails: Order;
  private orderId: number;
  public count: number = 0;

  constructor(private _appService: AppService, private _orderService: OrderService, private _http: HttpClient, private _getOrderServiceInfo: GetOrderInfoServiceService) {

  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // get the OrderDetails and assign to orderDetails variable.
    this.count = 0;
    var name: string;
    var userId: number

    name = localStorage.getItem('firstName');
    userId = parseInt(localStorage.getItem('userId'));
    console.log("userId in OrderDetailResolverService is. ", userId);

    if (userId !== undefined && userId !== null) {
      this._orderService.getOrderId(userId, 'OPEN').then(dt => {

        if (dt !== undefined && dt != 0) {
          this.setOrderId(dt);
          console.log("orderId in OrderDetailResolverService in the then . ", this.getOrderId());

          this._orderService.getProductFromCart(this.getOrderId()).subscribe(data => {
            console.log("this is this.getOrderId() ", this.getOrderId());
            console.log("this is 'data' in getProductFromCart(.)", data);
            this._appService.setOrderDetail(data);

            this.orderDetails = <Order>data['order'];
            console.log("orderDetails in OrderDetailResolverService are. ", this.orderDetails);
            console.log("customerId in OrderDetailResolverService is. ", this.orderDetails.customerName);
            // to caleculate the Quantity.
            console.log("in OrderDetailResolverService orderItemObj is. ", this.orderDetails.orderItemObj);

            this._getOrderServiceInfo.set('order', this.orderDetails);
            console.log('order in order Info Service', this._getOrderServiceInfo.get('order'));
            this.orderDetails.orderItemObj.forEach(item => this.count = this.count + parseInt(item.quantity));
            console.log("value of this.count is. ", this.count);
            this._orderService.cartLengthChange.next(this.count);

          });
        }
        else {
          this._orderService.cartLengthChange.next(0);
        }
      });

    }
    return null;
  }

  public getOrderId() {
    return this.orderId;
  }
  public setOrderId(orderIdobj: number) { this.orderId = orderIdobj; }


}
