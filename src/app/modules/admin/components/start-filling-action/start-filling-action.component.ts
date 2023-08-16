/*
 *   Copyright (c) 2023 Dmantz Technologies Pvt ltd
 *   All rights reserved.
 */
import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductSkuDataService } from 'src/app/services/productsku-data.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-start-filling-action',
  templateUrl: './start-filling-action.component.html',
  styleUrls: ['./start-filling-action.component.scss']
})
export class StartFillingActionComponent implements OnInit {
  orderId: any
  Orderdetails: any;
  orderItemDetails: any;
  OrderStatus: any;
  startFillingform: any;
  imageBaseUrl: any;
  currentstatus: any
  public startfilling = 'FILLING IN PROGRESS'

  firstformdisable: boolean = false;
  secondFormPopupVisible: boolean = false;
  errorMessage: any
  constructor(private dialogRef: MatDialogRef<StartFillingActionComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private productskudataservice: ProductSkuDataService) {
    this.orderId = data.orderId


    this.startFillingform = new FormGroup({
      statusCd: new FormControl(),
      orderId: new FormControl(),
      staffCd: new FormControl()

    })
  }
  public config = {
    printMode: 'template-popup',
    popupProperties: 'toolbar=yes,scrollbars=yes,resizable=yes,top=0,left=0,fullscreen=yes',
    //pageTitle: '',
    //templateString: '<header>I\'m part of the template header</header>{{printBody}}<footer>I\'m part of the template footer</footer>',
    stylesheets: [{ rel: 'stylesheet', href: 'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css' }],
    // styles: ['td { border: 1px solid black; color: green;margin-top:400px;position:absolute }', 'table { border: 1px solid black; }', 'header, table, footer { margin-top:100px text-align: center; }']

  }


  ngOnInit(): void {
    console.log(this.startfilling);
    this.imageBaseUrl = environment.imagesBaseUrl
    this.productskudataservice.getOrderItemDetails(this.orderId).subscribe(data => {
      this.Orderdetails = data;
      this.orderItemDetails = this.Orderdetails.orderItems
      console.log(data)
    });
    this.productskudataservice.updateOrderStatus(this.startFillingform.value).subscribe((data: any) => {
      this.OrderStatus = data;
      console.log(this.OrderStatus);
      this.errorMessage = this.OrderStatus.message
      console.log(data);
      console.log(this.OrderStatus.message);
      console.log(this.OrderStatus.status);
    })



  }
  //   buttonClicked(value: string) {

  //     console.log('Button clicked with value:', value);
  // }


  filling(value: any) {

    console.log('button clicked with:', value);
  }


  startfillingaction() {
    this.filling(this.startfilling)

    if (this.OrderStatus.status == 'SUCCESS') {
      this.firstformdisable = false;
      this.secondFormPopupVisible = false;
      alert('SHIPPING IN PROGRESS');
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


  staffVerificationForm() {
    this.productskudataservice.updateOrderStatus(this.startFillingform.value).subscribe(data => {
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
