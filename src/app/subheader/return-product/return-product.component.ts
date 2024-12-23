/*
 *   Copyright (c) 2023 Dmantz Technologies private limited
 *   All rights reserved.
 */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderItemIdData, ReturnOrderItem } from '../../data/hero';
import { OrderService } from '../../sharedServices/order.service';

@Component({
  selector: 'app-return-product',
  templateUrl: './return-product.component.html',
  styleUrls: ['./return-product.component.css']
})
export class ReturnProductComponent implements OnInit {
  orderId: number;
  pskuId: number;
  orderItemId: number;
  radioValue: string = "";
  textboxValue: string = "";
  reason: string = "";

  constructor(private route: ActivatedRoute, private router: Router, private orderService: OrderService) { }

  ngOnInit() {
    this.orderId = this.route.snapshot.params["orderId"];
    this.pskuId = this.route.snapshot.params["skuId"];
    console.log("values of orderId and pskuId in ngOnInit() are.  ", this.orderId + " " + this.pskuId);

  }

  return(orderId: number, skuId: number) {
    console.log("selected radio button value is. ", this.radioValue);
    this.textboxValue = (document.getElementById("r9") as HTMLInputElement).value;
    console.log("textbox value is. ", this.textboxValue);

    if (this.radioValue == '') {
      if (this.textboxValue == '')
        this.router.navigate(["/main/header/subheader/returnProd", orderId, skuId]);
      else
        this.reason = this.textboxValue;
    }
    else
      this.reason = this.radioValue;
    console.log("value of reason variable is. ", this.reason);

    console.log("you have clicked confirm button. ");
    console.log("values of orderId and pskuId in return(.,.) are. ", orderId + " " + skuId);
    var orderItemIdData = new OrderItemIdData();
    orderItemIdData.orderId = orderId;
    orderItemIdData.skuId = skuId;
    this.orderService.getOrderItemId(orderItemIdData).subscribe(data => {
      this.orderItemId = data;
      console.log("orderItemId is. ", this.orderItemId);
      var returnOrderItem = new ReturnOrderItem();
      returnOrderItem.notes = "";
      returnOrderItem.orderId = orderId;
      returnOrderItem.orderItemId = this.orderItemId;
      returnOrderItem.returnReason = this.reason;

      this.orderService.returnProduct(returnOrderItem).subscribe(data => {
        var messages: any;
        messages = data;
        console.log("message after returning a product is. ", messages[0]);
      })
    })
  }

  back() {
    this.router.navigate(["/main/header/subheader/customerOrders"]);
  }
}
