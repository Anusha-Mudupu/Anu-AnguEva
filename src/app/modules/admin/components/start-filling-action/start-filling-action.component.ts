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
   orderId:any  
  Orderdetails: any;
  orderItemDetails: any;
  OrderStatus: Object;
  startFillingform:any;
  imageBaseUrl: any;
  currentstatus:any
startfilling='FILLING IN PROGRESS'
  constructor(private dialogRef: MatDialogRef<StartFillingActionComponent>,@Inject(MAT_DIALOG_DATA) public data: any,private productskudataservice:ProductSkuDataService ) { 
    this.orderId=data.orderId
    this.startFillingform=new FormGroup({
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
   this.productskudataservice.addOrderStatus(this.startFillingform.value).subscribe(data => {
      this.OrderStatus=data;
      console.log(data);
      alert('Successfully Updated')
    })
    }
    
    submit(){
      this.saveOrderWithUpdatedStatus()
    }

}
