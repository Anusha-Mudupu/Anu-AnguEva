import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ProductSkuDataService } from 'src/app/services/productsku-data.service';

@Component({
  selector: 'app-finish-filling-action',
  templateUrl: './finish-filling-action.component.html',
  styleUrls: ['./finish-filling-action.component.scss']
})
export class FinishFillingActionComponent implements OnInit {
  orderId:any
  orderItemDetails: any;
  Orderdetails: any;
  currentstatus: any;
  OrderStatus: Object;
  finishfillingform:any
  finishfilling='FILLED'
  constructor(private dialogRef: MatDialogRef<FinishFillingActionComponent>,private productskudataservice:ProductSkuDataService,private activated:ActivatedRoute,@Inject(MAT_DIALOG_DATA) public data: any) { 
    this.orderId=data.orderId;
    this.finishfillingform=new FormGroup({
      statusCd:new FormControl(),
      orderId:new FormControl(),
     lastUpdateDtTm:new FormControl()
    })
  }
 
  ngOnInit(): void {
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
     this.productskudataservice.addOrderStatus(this.finishfillingform.value).subscribe(data => {
        this.OrderStatus=data;
        console.log(data);
        alert('Successfully Updated')
      })
      }
      
      submit(){
        this.saveOrderWithUpdatedStatus()
      }

}
