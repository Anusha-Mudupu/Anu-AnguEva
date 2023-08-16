/*
 *   Copyright (c) 2023 Dmantz Technologies Pvt ltd
 *   All rights reserved.
 */
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductSkuDataService } from 'src/app/services/productsku-data.service';
import { environment } from 'src/environments/environment';

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
  currentstatus: any;
  OrderStatus: any;
  finishshippingform:any
  finishshipping='SHIPPED';
  shouldHideBorder:boolean=true;
  firstformdisable: boolean = false;
  secondFormPopupVisible: boolean = false;
  errorMessage: any;
  constructor(private dialogRef: MatDialogRef<FinishShippingActionComponent>,@Inject(MAT_DIALOG_DATA) public data: any,private productskudataservice:ProductSkuDataService) { 
    this.orderId=data.orderId
    this.finishshippingform=new FormGroup({
      statusCd:new FormControl(),
      orderId:new FormControl(),
      staffCd: new FormControl()
 
    })
  }

  ngOnInit(): void {
    this.imageBaseUrl=environment.imagesBaseUrl
    this.productskudataservice.getOrderItemDetails(this.orderId).subscribe(data=>{
      this.Orderdetails=data;
      this.orderItemDetails=this.Orderdetails.orderItems
     
      console.log(data)
     })
     this.productskudataservice.updateOrderStatus(this.finishshippingform.value).subscribe(data => {
      this.OrderStatus=data;
      console.log(data);
      this.errorMessage = this.OrderStatus.message
      console.log(this.OrderStatus.message);
      console.log(this.OrderStatus.status);
     });
    
     
  }

  
  
  finishShipping(value:any){
   
    console.log('value',value);

    }
 
      
     submit(){
     this.finishShipping(this.finishshipping)
   
      if (this.OrderStatus.status == 'SUCCESS') {
        this.firstformdisable = false;
        this.secondFormPopupVisible = false;
        alert('SHIPPING FINISHED');
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

    submitSecondForm() {

      this.productskudataservice.updateOrderStatus(this.finishshippingform.value).subscribe(data => {
        this.OrderStatus=data;
        console.log(data);

       
        if (this.OrderStatus.status == 'SUCCESS') {
          this.firstformdisable = false;
          this.secondFormPopupVisible = false;
          alert('STAFF VERIFIED SUCCESSFULLY');
  
        }
        else{
          if(this.OrderStatus.status =='FAILURE'){
            alert('STAFF IS UNAUTHORIZED PLEASE TRY AGAIN');
          }
        }
      
      });
     
    }

}
