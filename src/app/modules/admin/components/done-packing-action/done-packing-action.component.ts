/*
 *   Copyright (c) 2023 Dmantz Technologies Pvt ltd
 *   All rights reserved.
 */
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ProductSkuDataService } from 'src/app/services/productsku-data.service';
import { environment } from 'src/environments/environment';
import { StaffVerificationComponent } from '../staff-verification/staff-verification.component';

@Component({
  selector: 'app-done-packing-action',
  templateUrl: './done-packing-action.component.html',
  styleUrls: ['./done-packing-action.component.scss']
})
export class DonePackingActionComponent implements OnInit {
  orderId: any;
  imageBaseUrl: any;
  Orderdetails: any;
  orderItemDetails: any;
 
  OrderStatus: any;
  packingdoneform: any
  packingdone = 'PACKING DONE'
  shouldHideBorder: boolean = true;
 
  errorMessage: any;
  constructor(private dialogRef: MatDialogRef<DonePackingActionComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private productskudataservice: ProductSkuDataService,private dailog:MatDialog) {
    this.orderId = data.orderId
  
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

    this.imageBaseUrl = environment.imagesBaseUrl
    this.productskudataservice.getOrderItemDetails(this.orderId).subscribe(data => {
      this.Orderdetails = data;
      this.orderItemDetails = this.Orderdetails.orderItems
      console.log(data)
    });
   
  }



 

  submit() {
    const dialogRef = this.dailog.open(StaffVerificationComponent, {

      data: { orderId: this.orderId,status:this.packingdone }
    }).afterClosed().subscribe((result:any) => {

      this.ngOnInit();
    })
  }

  getInputStyles() {
    return {
      'background-color': 'var(--toast-background)',
      'color': 'var(--toast-text)',
      // ... other styling properties
    };
  
    }


}
