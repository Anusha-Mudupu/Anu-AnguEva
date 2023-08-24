/*
 *   Copyright (c) 2023 Dmantz Technologies Pvt ltd
 *   All rights reserved.
 */

import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { NgxPrintElementService } from 'ngx-print-element';
import { ProductSkuDataService } from 'src/app/services/productsku-data.service';


import { StaffVerificationComponent } from '../staff-verification/staff-verification.component';


@Component({
  selector: 'app-verify-payment',
  templateUrl: './verify-payment.component.html',
  styleUrls: ['./verify-payment.component.scss']
})
export class VerifyPaymentComponent implements OnInit {
  allOrders: any;
  verifypaymentform: any;
  orderId: any
  Orderdetails: any;
  OrderStatus: any;
  orderItemDetails: any;
  isDisabled: boolean = true;
  totalAmount: any;
  paymentverified = 'PAYMENT VERIFIED'
  paymentfailed = 'PAYMENT FAILED'
  errorMessage: any;

  constructor(private print: NgxPrintElementService, private dialogRef: MatDialogRef<VerifyPaymentComponent>, private productskudataservice: ProductSkuDataService, private activated: ActivatedRoute, @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder, private dailog: MatDialog) {
    this.orderId = data.orderId;

    console.log(this.orderId);

  
  }

  public config = {
    printMode: 'template-popup',
    popupProperties: 'toolbar=yes,scrollbars=yes,resizable=yes,top=0,left=0,fullscreen=yes',
    //pageTitle: '',
    //templateString: '<header>I\'m part of the template header</header>{{printBody}}<footer>I\'m part of the template footer</footer>',
    stylesheets: [{ rel: 'stylesheet', href: 'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css' }],
    styles: ['td { border: 1px solid black;}', 'table { border: 1px solid black; }', 'header, table, footer { margin-top:100px text-align: center; }']
  }

  ngOnInit(): void {
    this.productskudataservice.getOrderItemDetails(this.orderId).subscribe(data => {
      this.Orderdetails = data;
      this.totalAmount = this.Orderdetails.totalAmount
      this.orderItemDetails = this.Orderdetails.orderItems
      console.log(data)
      console.log(this.Orderdetails.totalAmount)
    });
  }

  paymentSuccess(orderId: any) {
    const dialogRef = this.dailog.open(StaffVerificationComponent, {
      data: {
        orderId: orderId,
        status: this.paymentverified
      }
    }).afterClosed().subscribe(result => {
      this.ngOnInit();
    })

  }

  paymentFailed() {

    const dialogRef = this.dailog.open(StaffVerificationComponent, {

      data: { orderId: this.orderId, status: this.paymentfailed }
    }).afterClosed().subscribe(result => {

      this.ngOnInit();
    })



  }



}
