/*
 *   Copyright (c) 2023 Dmantz Technologies private limited
 *   All rights reserved.
 */
import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/sharedServices/app.service';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../sharedServices/order.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { RefundOrderDetails } from '../data/hero';
import { OrderDetailResolverService } from '../sharedServices/order-detail-resolver.service';
import { GetOrderInfoServiceService } from '../sharedServices/get-order-info-service.service';
@Component({
  selector: 'app-cancel-order',
  templateUrl: './cancel-order.component.html',
  styleUrls: ['./cancel-order.component.css'],

})
export class CancelOrderComponent implements OnInit {
  orderId: number;
  public subViewOrder: any;
  imagesBaseUrl: string;
  returnOrderOrderItemId: any;
  details: any;
  submitted = false;
  loading = false;
  refundResDetails: RefundOrderDetails[] = [];
  constructor(private appService: AppService,
    private orderdetailresolver: OrderDetailResolverService,
    private getOrderInfoService: GetOrderInfoServiceService,
    private route: ActivatedRoute,
    private orderservice: OrderService,
    private router: Router) {

  }

  ngOnInit() {
    this.appService.setShowBanner(false);
    this.appService.setShowDeals(false);
    this.appService.setShowMenuIcons(false);
    this.appService.setShowBanner(false);
    this.imagesBaseUrl = environment.imagesBaseUrl;
    this.orderId = this.route.snapshot.params['orderId'];
    this.subViewOrders(this.orderId);


  }
  //reason of cancel form
  cancelformsubmit(cancelform: NgForm) {
    this.loading = true;
    this.details = cancelform.value;
    console.log("cancelform: ", this.details.reason);
    console.log("cancelform: ", cancelform.value);
    this.cancelOrder();
  }
  save() {
    this.loading = true;
    console.log("entered");
    this.submitted == true;
  }

  //ViewOrder(product) deatils 
  subViewOrders(orderId: number) {
    this.orderservice.viewOrderSubDetails(orderId).subscribe(data => {
      this.subViewOrder = data;
      console.log("this.custSubViewOrder value is. ", this.subViewOrder);
    });

  }

  cancelOrder() {
    this.submitted = true;
    console.log(this.orderId);
    this.subViewOrders(this.orderId);
    console.log("returnOrderOrderItemId : ", this.returnOrderOrderItemId);
    console.log("orderId in cancel-order.component.ts file is. ", this.orderId);
    this.orderservice.cancelOrder(this.orderId).subscribe((data: any) => {
      console.log("cancel satus", data)
    });

    console.log("order hasbeen cancelled");

    Swal.fire('CANCELLED!!', 'your! order hasbeen cancelled', 'cancelled');

    this.router.navigate(["/main/header/subheader/customerOrders"])
  }
  //back to view-order-component  
  backToCustomerOrders() {
    console.log("you have clicked backToCustomerOrders()");
    this.router.navigate(["/main/header/subheader/customerOrders"]);
  }
  getDetail(productId, productSku) {
    console.log(productId);

    console.log(productSku);

    this.router.navigate(['/main/header/subheader/productDetail', productId, productSku]);
    console.log("productId is. ", productId);
  }
}
