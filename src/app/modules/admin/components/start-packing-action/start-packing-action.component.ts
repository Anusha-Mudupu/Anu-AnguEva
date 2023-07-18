import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductSkuDataService } from 'src/app/services/productsku-data.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-start-packing-action',
  templateUrl: './start-packing-action.component.html',
  styleUrls: ['./start-packing-action.component.scss']
})
export class StartPackingActionComponent implements OnInit {
  orderId: any;
  imageBaseUrl: any;
  Orderdetails: any;
  orderItemDetails: any;
  currentstatus: any;
  OrderStatus: any;
  startpackingform:any
  startpacking='PACKING IN PROGRESS'
  shouldHideBorder:boolean=true
  constructor(private dialogRef: MatDialogRef<StartPackingActionComponent>,@Inject(MAT_DIALOG_DATA) public data: any,private productskudataservice:ProductSkuDataService) {
    this.orderId=data.orderId
    this.startpackingform=new FormGroup({
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

  filling(event:any){

    this.currentstatus=event.target.value;
    console.log(this.currentstatus)
    // alert('You  have selected Status')
 
    }
  saveOrderWithUpdatedStatus() {
    this.productskudataservice.updateOrderStatus(this.startpackingform.value).subscribe(data => {
       this.OrderStatus=data;
       console.log(data);
       alert('Successfully Updated')
     })
     }
      
     submit(){
      this.filling(event)
  this.saveOrderWithUpdatedStatus()
    
    }

}
