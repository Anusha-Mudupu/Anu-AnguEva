import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductSkuDataService } from 'src/app/services/productsku-data.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-check-quantity-action',
  templateUrl: './check-quantity-action.component.html',
  styleUrls: ['./check-quantity-action.component.scss']
})
export class CheckQuantityActionComponent implements OnInit {
  orderId: any;
  imageBaseUrl: any;
  Orderdetails: any;
  orderItemDetails: any;
  currentstatus: any;
  OrderStatus: any;
  checkqualityform:any;
  checkquantity='QC IN PROGRESS'
  constructor( private dialogRef: MatDialogRef<CheckQuantityActionComponent>,@Inject(MAT_DIALOG_DATA) public data: any,private productskudataservice:ProductSkuDataService ) {
    this.orderId=data.orderId
    this.checkqualityform=new FormGroup({
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



  filling(event:any){
    this.currentstatus=event.target.value;
    console.log(this.currentstatus)
    alert('You selected Status')
    }
  
    saveOrderWithUpdatedStatus() {
     this.productskudataservice.addOrderStatus(this.checkqualityform.value).subscribe(data => {
        this.OrderStatus=data;
        console.log(data);
        alert('Successfully Updated')
      })
      }
      
      submit(){
        this.saveOrderWithUpdatedStatus()
      }
  

}
