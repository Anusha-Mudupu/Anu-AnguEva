/*
 *   Copyright (c) 2023 Dmantz Technologies Pvt ltd
 *   All rights reserved.
 */

import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { NgxPrintElementService } from 'ngx-print-element';
import { ProductSkuDataService } from 'src/app/services/productsku-data.service';


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
  orderItemDetails: any

  paymentsuccess: any;
  paymentfail: any
  @Input() datafromparent: any
  isDisabled: boolean = true;
  firstformdisable: boolean = false;
  secondFormPopupVisible: boolean = false;
  paymentverified = 'PAYMENT VERIFIED'
  paymentfailed = 'PAYMENT FAILED'
  errorMessage: any;

  constructor(private print: NgxPrintElementService, private dialogRef: MatDialogRef<VerifyPaymentComponent>, private productskudataservice: ProductSkuDataService, private activated: ActivatedRoute, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.orderId = data.orderId;

    console.log(this.orderId);


    this.verifypaymentform = new FormGroup({
      orderId: new FormControl(''),
      statusCd: new FormControl(''),
      staffCd: new FormControl('')
    });

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
      this.orderItemDetails = this.Orderdetails.orderItems
      console.log(data)
    });
    this.productskudataservice.updateOrderStatus(this.verifypaymentform.value).subscribe(data => {
      this.OrderStatus = data;
      this.errorMessage = this.OrderStatus.message
      console.log(data);
      console.log(this.OrderStatus.message);
      console.log(this.OrderStatus.status);
    })

  }

  success(event: any) {
    this.paymentsuccess = event.target.value;

    console.log(this.paymentsuccess);


  }

  failed(event: any) {
    this.paymentfail = event.target.value;
    console.log(this.paymentfail);
    // alert('Payment Failed')

  }

  saveOrderWithUpdatedStatus() {
    this.productskudataservice.updateOrderStatus(this.verifypaymentform.value).subscribe(data => {
      this.OrderStatus = data;
      this.errorMessage = this.OrderStatus.message
      console.log(data);
      console.log(this.OrderStatus.message);
      console.log(this.OrderStatus.status);


    })
  }



  paymentSuccess() {
    this.success(event);

    if (this.OrderStatus.status == 'SUCCESS') {
      this.firstformdisable = false;
      this.secondFormPopupVisible = false;
      alert('PAYMENT VERIFIED SCCESSFULLY');
      console.log('Payment Verified Successful')
      this.dialogRef.close();
    }
    else {
      if (this.OrderStatus.status == 'FAILURE') {
        this.firstformdisable = true;
        this.secondFormPopupVisible = true;
        window.alert('VERIFY THE STAFF FIRST');
      }

    }
  }

  paymentFailed() {
    this.failed(event);
    if (this.OrderStatus.status == 'SUCCESS') {
      this.firstformdisable = false;
      this.secondFormPopupVisible = false;
      alert('PAYMENT FAILED');
      console.log('Payment Verified Successful');
      this.dialogRef.close();
    }
    else {
      if (this.OrderStatus.status == 'FAILURE') {
        this.firstformdisable = true;
        this.secondFormPopupVisible = true;
        window.alert('VERIFY THE STAFF FIRST');
      }

    }
    // this.saveOrderWithUpdatedStatus();
  }


  submitSecondForm() {
    this.productskudataservice.updateOrderStatus(this.verifypaymentform.value).subscribe(data => {
      this.OrderStatus = data;
      this.errorMessage = this.OrderStatus.message

      if (this.OrderStatus.status == 'SUCCESS') {
        this.firstformdisable = false;
        this.secondFormPopupVisible = false;
        alert('STAFF VERIFIED SUCCESSFULLY');

      }
      else {
        if (this.OrderStatus.status == 'FAILURE') {
          this.firstformdisable = true;
          this.secondFormPopupVisible = true;
        }
        window.alert('STAFF IS UNAHUTORIZED PLEASE TRY AGAIN');
      }

    })
   }
}
