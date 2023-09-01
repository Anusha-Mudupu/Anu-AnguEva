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
  selector: 'app-finish-shipping-action',
  templateUrl: './finish-shipping-action.component.html',
  styleUrls: ['./finish-shipping-action.component.scss']
})
export class FinishShippingActionComponent implements OnInit {
  orderId: any;
  imageBaseUrl: any;
  Orderdetails: any;
  orderItemDetails: any;
 
  OrderStatus: any;
  finishshippingform:any
  finishshipping='SHIPPED';
  shouldHideBorder:boolean=true;
  
  errorMessage: any;
  constructor(private dialogRef: MatDialogRef<FinishShippingActionComponent>,@Inject(MAT_DIALOG_DATA) public data: any,private productskudataservice:ProductSkuDataService,private dailog:MatDialog) { 
    this.orderId=data.orderId
   
  }

  ngOnInit(): void {
    this.imageBaseUrl=environment.imagesBaseUrl
    this.productskudataservice.getOrderItemDetails(this.orderId).subscribe(data=>{
      this.Orderdetails=data;
      this.orderItemDetails=this.Orderdetails.orderItems
     
      console.log(data)
     })
    
    
     
  }

  
  
 
 
      
     submit(){
      const dialogRef = this.dailog.open(StaffVerificationComponent, {

        data: { orderId: this.orderId,status:this.finishshipping }
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
