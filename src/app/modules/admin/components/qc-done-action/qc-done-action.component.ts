import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductSkuDataService } from 'src/app/services/productsku-data.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-qc-done-action',
  templateUrl: './qc-done-action.component.html',
  styleUrls: ['./qc-done-action.component.scss']
})
export class QCDoneActionComponent implements OnInit {
  orderId: any;
  checkqualityform: any;
  imageBaseUrl: any;
  Orderdetails: any;
  orderItemDetails: any;
  currentstatus: any;
  OrderStatus: any;
  qualitcheckdoneform:any
  Qcsuccess = 'QC SUCCESS'
  Qcfailed = 'QC FAILED'
  isCheckboxSelected = false;
  isSubmitDisabled = true;
  constructor(private dialogRef: MatDialogRef<QCDoneActionComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private productskudataservice: ProductSkuDataService) {
    this.orderId = data.orderId
    this.qualitcheckdoneform = new FormGroup({
      statusCd: new FormControl(),
      orderId: new FormControl(),
     
    })
  }

  ngOnInit(): void {
    this.imageBaseUrl = environment.imagesBaseUrl
    this.productskudataservice.getOrderItemDetails(this.orderId).subscribe(data => {
      this.Orderdetails = data;
      this.orderItemDetails = this.Orderdetails.orderItems

      console.log(data)
    })
  }

  onCheckboxChange(event: any) {
    this.isCheckboxSelected = event.target.checked;
    this.isSubmitDisabled = !this.isCheckboxSelected;
  }

  success(event: any) {
    this.currentstatus = event.target.value;

    console.log(this.Qcsuccess);
    alert('Quality Check Success')

  }

  failed(event: any) {
    this.currentstatus = event.target.value;
    console.log(this.Qcfailed);
    alert('Quality Check Failed')

  }

  saveOrderWithUpdatedStatus() {
    
    this.productskudataservice.updateOrderStatus(this.qualitcheckdoneform.value).subscribe(data => {
      this.OrderStatus = data;
      console.log(data);

    })
  }


  paymentSuccess() {
    this.success(event);
    this.saveOrderWithUpdatedStatus();
  }
  paymentFailed() {
    this.failed(event);
    this.saveOrderWithUpdatedStatus();
  }


}
