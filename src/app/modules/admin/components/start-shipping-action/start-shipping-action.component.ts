import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductSkuDataService } from 'src/app/services/productsku-data.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-start-shipping-action',
  templateUrl: './start-shipping-action.component.html',
  styleUrls: ['./start-shipping-action.component.scss']
})
export class StartShippingActionComponent implements OnInit {
  orderId: any;
  imageBaseUrl: any;
  Orderdetails: any;
  orderItemDetails: any;
  currentstatus: any;
  OrderStatus: any;
  startshippingform:any
  StartShipping='SHIPPING IN PROGRESS'

  shouldHideBorder:boolean=true
  constructor(private dialogRef: MatDialogRef<StartShippingActionComponent>,@Inject(MAT_DIALOG_DATA) public data: any,private productskudataservice:ProductSkuDataService) { 
    this.orderId=data.orderId
    this.startshippingform=new FormGroup({
      statusCd:new FormControl(),
      orderId:new FormControl(),
     lastUpdateDtTm:new FormControl()
    })
  }

  ngOnInit(): void {
    this.imageBaseUrl=environment.imagesBaseUrl
    this.productskudataservice.getOrderItemDetails(this.orderId).subscribe(data=>{
      this.Orderdetails=data;
      this.orderItemDetails=this.Orderdetails.orderItems
     
      console.log(data)
     })
  }
  packingDone(event:any){
    this.currentstatus=event.target.value;
    console.log(this.currentstatus)
    // alert('You  have selected Status')
    }
  saveOrderWithUpdatedStatus() {

    this.productskudataservice.updateOrderStatus(this.startshippingform.value).subscribe(data => {
       this.OrderStatus=data;
       console.log(data);
       alert('Successfully Updated')
     })
     }
      
     submit(){
    this.packingDone(event)
      this.saveOrderWithUpdatedStatus()
    }

}
