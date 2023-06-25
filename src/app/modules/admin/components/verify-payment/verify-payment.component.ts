import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { OrderDetails } from 'src/app/data/data-objects';
import { ProductSkuDataService } from 'src/app/services/productsku-data.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-verify-payment',
  templateUrl: './verify-payment.component.html',
  styleUrls: ['./verify-payment.component.scss']
})
export class VerifyPaymentComponent implements OnInit {
  allOrders:any;
  verifypaymentform:any
  orderId:any
  Orderdetails: any;
  OrderStatus:any;
  orderItemDetails:any
 
  paymentsuccess:any;
  paymentfail:any
  @Input() datafromparent :any
 
  
  paymentverified ='PAYMENT VERIFIED'
  paymentfailed='PAYMENT FAILED'
  constructor( private dialogRef: MatDialogRef<VerifyPaymentComponent>,private productskudataservice:ProductSkuDataService,private activated:ActivatedRoute,@Inject(MAT_DIALOG_DATA) public data: any) { 
     this.orderId=data.orderId;
  
    console.log(this.orderId)


     this.verifypaymentform=new FormGroup({
      orderId:new FormControl(''),
     statusCd:new FormControl(''),
     
     
     
    })
  }
 
  ngOnInit(): void {
    // this.id=this.activated.snapshot.params['orderId']
   
    this.productskudataservice.getOrderItemDetails(this.orderId).subscribe(data=>{
     this.Orderdetails=data;
     this.orderItemDetails=this.Orderdetails.orderItems
    
     console.log(data)
    })
  }

  success(event:any)
{
  this.paymentsuccess=event.target.value;

  console.log(this.paymentsuccess);
  alert('Payment Verified Successfully')
 
}
  
failed(event:any){
  this.paymentfail=event.target.value;
  console.log(this.paymentfail);
  alert('Payment Failed')

}

  saveOrderWithUpdatedStatus() {
   
   
 
      this.productskudataservice.updateOrderStatus(this.verifypaymentform.value).subscribe(data => {
        this.OrderStatus=data;
        console.log(data);
      })
      

  
      
    }
    
    //  this.failed(event);
    
   



    paymentSuccess(){
       this.success(event);
    this.saveOrderWithUpdatedStatus();
   }
   paymentFailed(){
    this.failed(event);
    this.saveOrderWithUpdatedStatus();
   }

}

