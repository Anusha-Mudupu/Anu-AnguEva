/*
 *   Copyright (c) 2023 Dmantz Technologies Pvt ltd
 *   All rights reserved.
 */
import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ProductSkuDataService } from 'src/app/services/productsku-data.service';

@Component({
  selector: 'app-staff-verification',
  templateUrl: './staff-verification.component.html',
  styleUrls: ['./staff-verification.component.scss']
})
export class StaffVerificationComponent implements OnInit {
  staffVerificationForm: any;
  orderId: any;
  Orderdetails: any;
  orderItemDetails: any;
  OrderStatus: any;
  errorMessage: any;
  status: any;
  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<StaffVerificationComponent>, private productskudataservice: ProductSkuDataService, private activated: ActivatedRoute, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.orderId = data.orderId;
    this.status = data.status
    console.log(this.status)

    this.staffVerificationForm = this.fb.group({
      orderId: this.orderId,
      statusCd: this.status,
      // staffCd: new FormControl('',[Validators.required])
      staffCd: ['', [Validators.required, Validators.pattern(/^[0-9]*$/)]],
    });
  }

  ngOnInit(): void {
  }
  submitSecondForm() {

    this.productskudataservice.updateOrderStatus(this.staffVerificationForm.value).subscribe(data => {
      this.OrderStatus = data;
      this.errorMessage = this.OrderStatus.message
      if (this.staffVerificationForm.valid) { 
      if (this.OrderStatus.status == 'SUCCESS') {

        alert('STAFF VERIFIED SUCCESSFULLY');
        this.dialogRef.close();
      }
      else {
        if (this.OrderStatus.status == 'FAILURE') {

        }
        window.alert('STAFF IS UNAHUTORIZED PLEASE TRY AGAIN');
      }
    }
    })
    console.log(this.staffVerificationForm.value)

  }
}
