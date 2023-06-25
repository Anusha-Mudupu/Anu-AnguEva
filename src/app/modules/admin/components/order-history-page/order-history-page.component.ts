import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ProductSkuDataService } from 'src/app/services/productsku-data.service';

@Component({
  selector: 'app-order-history-page',
  templateUrl: './order-history-page.component.html',
  styleUrls: ['./order-history-page.component.scss']
})
export class OrderHistoryPageComponent implements OnInit {
 orderId:any;
 Orderhistory:any;
 Orderstatuces:any
  constructor(private dialogRef: MatDialogRef<OrderHistoryPageComponent>,private productskudataservice:ProductSkuDataService,private activated:ActivatedRoute,@Inject(MAT_DIALOG_DATA) public data: any) {
    this.orderId=data.orderId;
   }

  ngOnInit(): void {
    this.productskudataservice.getOrderStatusHistoryByOrderId(this.orderId).subscribe(data=>{
      this.Orderhistory=data;
      this.Orderstatuces=this.Orderhistory.orderStatus
      console.log(this.Orderstatuces);
      console.log(this.Orderhistory);
    })
  }

}
