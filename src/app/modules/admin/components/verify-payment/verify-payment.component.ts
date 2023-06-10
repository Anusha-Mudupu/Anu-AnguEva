import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ProductSkuDataService } from 'src/app/services/productsku-data.service';

@Component({
  selector: 'app-verify-payment',
  templateUrl: './verify-payment.component.html',
  styleUrls: ['./verify-payment.component.scss']
})
export class VerifyPaymentComponent implements OnInit {
  allOrders:any;
  verifypaymentform:FormGroup
  orderId:any
  Orderdetails: any;

  constructor(private productskudataservice:ProductSkuDataService,private activated:ActivatedRoute ) { 
     this.verifypaymentform=new FormGroup({
      status:new FormControl('')

    })
  }
 
  ngOnInit(): void {
    this.orderId=this.activated.snapshot.params['orderId']
    this.productskudataservice.getOrderItemDetails(this.orderId).subscribe(data=>{
     this.Orderdetails=data;
    //  this.Orderdetails=this.Orderdetails.orderItems
     console.log(data)
    })
  }
  saveUpdateOrder() {
    this.productskudataservice.updateOrderStatusByOrderId(this.orderId,this.Orderdetails).subscribe(data => {
        console.log(data);
        alert('successfully updated');
      })
    }


  submit(){
    if(this.Orderdetails.status===true){
      this.Orderdetails.status='filling in progress'
    }
    else
    if(this.Orderdetails.status===false){
      this.Orderdetails.status='Not-Available'
    }
  this.saveUpdateOrder();
  }

}
