/*
 *   Copyright (c) 2023 Dmantz Technologies Pvt ltd
 *   All rights reserved.
 */
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductSkuDataService } from 'src/app/services/productsku-data.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-order-item-details',
  templateUrl: './order-item-details.component.html',
  styleUrls: ['./order-item-details.component.scss']
})
export class OrderItemDetailsComponent implements OnInit {
orderId:any
 Orderdetails:any
orderItemDetails:any;
  imageBaseUrl: any;

  constructor(private activated:ActivatedRoute,private productskudataservice:ProductSkuDataService,private route:Router) { }

  ngOnInit(): void {
    this.imageBaseUrl=environment.imagesBaseUrl
    this.orderId=this.activated.snapshot.params['orderId'];
    console.log('oredrid',this.orderId);
 this.productskudataservice.getOrderItemDetails(this.orderId).subscribe(data=>{
  this.Orderdetails=data;
  this.orderItemDetails=this.Orderdetails.orderItems
  console.log(data)
 })

  }

  goToOrdersList(){
     this.route.navigate(['/admin/order-management']);
    console.log('click')
  }

}
