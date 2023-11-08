/*
 *   Copyright (c) 2023 Dmantz Technologies Pvt ltd
 *   All rights reserved.
 */
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ProductSkuDataService } from 'src/app/services/productsku-data.service';
import { environment } from 'src/environments/environment';
import { StaffVerificationComponent } from '../staff-verification/staff-verification.component';

@Component({
  selector: 'app-finish-filling-action',
  templateUrl: './finish-filling-action.component.html',
  styleUrls: ['./finish-filling-action.component.scss']
})
export class FinishFillingActionComponent implements OnInit {
  orderId: any
  orderItemDetails: any;
  Orderdetails: any;
  currentstatus: any;
  OrderStatus: any;
  finishfillingform: any
  finishfilling = 'FILLED'

  partaillyFilled = 'PARTIALLY FILLED'

  imageBaseUrl: any;
  errorMessage: any

  isCheckboxSelected: any;
  isCheckboxSelected2: any;
  isSubmitDisabled = true;
  isDisable: any = false;
  firstCheckbox = false;
  disabledRows: boolean[] = [];
  constructor(private dialogRef: MatDialogRef<FinishFillingActionComponent>, private productskudataservice: ProductSkuDataService, private activated: ActivatedRoute, @Inject(MAT_DIALOG_DATA) public data: any, private dailog: MatDialog) {
    this.orderId = data.orderId;

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
    this.imageBaseUrl = environment.imagesBaseUrl
    this.productskudataservice.getOrderItemDetails(this.orderId).subscribe(data => {
      this.Orderdetails = data;
      this.orderItemDetails = this.Orderdetails.orderItems
      console.log(data)
    });


  }



  //   onCheckboxChange(event: any) {
  //     this.isCheckboxSelected = event.target.checked;
  //     this.isSubmitDisabled = !this.isCheckboxSelected;
  //     this.isDisable=!this.isCheckboxSelected;
  //   }
  //   onCheckboxChange2(event:any){
  //   this.isCheckboxSelected2=event.target.checked;
  //   this.firstCheckbox=this.isCheckboxSelected2;
  //   this.isSubmitDisabled=!this.isCheckboxSelected2;
  //  }


  onCheckboxChange(event: any, i: any, action: any) {
    if (action === 'Yes' && this.orderItemDetails[i].orderItemId) {
      this.isCheckboxSelected = event.target.checked;
      this.isDisable = this.isCheckboxSelected;
      this.isSubmitDisabled = !this.isCheckboxSelected;
      console.log('if called', this.orderItemDetails[i])
    }
    else {
      if (action === 'Partially-Filled' && this.orderItemDetails[i].orderItemId) {
        this.isCheckboxSelected2 = event.target.checked;
        this.firstCheckbox = this.isCheckboxSelected2;
        this.isSubmitDisabled = !this.isCheckboxSelected2;
        console.log('else called')
      }
    }

  }

  // onCheckboxChange(event: any, index: number, action: string) {
  //   if (action === 'Yes') {
  //     // If "Yes" is checked, disable "Partially Filled"
  //     this.disabledRows[index] = false;
  //     this.disabledRows[index] = true;
  //   } else if (action === 'Partially-Filled') {
  //     // If "Partially Filled" is checked, disable "Yes"
  //     this.disabledRows[index] = false;
  //     this.disabledRows[index] = true;

  //   }

  //   // Enable or disable the submit button based on the checkbox states
  //   this.isSubmitDisabled = this.disabledRows.some(disabled => !disabled);
  // }
  
    fillingSuccess() {
    const dialogRef = this.dailog.open(StaffVerificationComponent, {

      data: { orderId: this.orderId, status: this.finishfilling }
    }).afterClosed().subscribe((result: any) => {

      this.ngOnInit();
    })

  }
  fillingFailed() {
    const dialogRef = this.dailog.open(StaffVerificationComponent, {

      data: { orderId: this.orderId, status: this.partaillyFilled }
    }).afterClosed().subscribe(result => {

      this.ngOnInit();
    })

  }




}