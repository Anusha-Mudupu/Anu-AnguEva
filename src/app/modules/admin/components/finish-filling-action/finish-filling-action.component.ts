import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ProductSkuDataService } from 'src/app/services/productsku-data.service';
import { environment } from 'src/environments/environment';

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
  fillingconformation ='FILLED'
  confirmationfailed='CONFORMATION FAILED'
  fillingsuccess:any;
  fillingfailed:any
  imageBaseUrl: any;


  isCheckboxSelected = false;
  isSubmitDisabled = true;

 
  constructor(private dialogRef: MatDialogRef<FinishFillingActionComponent>,private productskudataservice:ProductSkuDataService,private activated:ActivatedRoute,@Inject(MAT_DIALOG_DATA) public data: any) { 
    this.orderId=data.orderId;
    this.finishfillingform=new FormGroup({
      statusCd:new FormControl(),
      orderId:new FormControl(),
   
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
    this.imageBaseUrl=environment.imagesBaseUrl
    this.productskudataservice.getOrderItemDetails(this.orderId).subscribe(data=>{
      this.Orderdetails=data;
      this.orderItemDetails=this.Orderdetails.orderItems
     
      console.log(data)
     })
  }
 

  onCheckboxChange(event: any) {
    this.isCheckboxSelected = event.target.checked;
    this.isSubmitDisabled = !this.isCheckboxSelected;
  }


  success(event:any)
  {
    this.fillingsuccess=event.target.value;
  
    console.log(this.fillingsuccess);
    // alert('Payment Verified Successfully')
   
  }
    
  failed(event:any){
    this.fillingfailed=event.target.value;
    console.log(this.fillingfailed);
    alert('Payment Failed')
  
  }
  
    saveOrderWithUpdatedStatus() {
      if(this.finishfillingform.statusCd===this.currentstatus){
     this.productskudataservice.updateOrderStatus(this.finishfillingform.value).subscribe(data => {
        this.OrderStatus=data;
        console.log(data);
        alert('Successfully Updated')
      })
      }
    }
      
      submit(){
        this.saveOrderWithUpdatedStatus()
      }


      paymentSuccess(){
        this.success(event);
       this.onCheckboxChange(event)
     this.saveOrderWithUpdatedStatus();
    }
    paymentFailed(){
     this.failed(event);
     this.saveOrderWithUpdatedStatus();
    }

}
