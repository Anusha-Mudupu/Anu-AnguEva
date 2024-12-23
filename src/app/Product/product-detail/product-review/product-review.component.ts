/*
 *   Copyright (c) 2023 Dmantz Technologies private limited
 *   All rights reserved.
 */
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, UntypedFormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product, ProductReview, productsku } from 'src/app/data/hero';
import { AppService } from 'src/app/sharedServices/app.service';
import { ProductReviewService } from 'src/app/sharedServices/product-review.service';

@Component({
  selector: 'app-product-review',
  templateUrl: './product-review.component.html',
  styleUrls: ['./product-review.component.css']
})
export class ProductReviewComponent implements OnInit {
  values = ['Yes', 'No'];
  recommendedFlag = this.values[0];
  lastUpdate = new Date();
  customerName: string;
  @Input() currentTileProductDetail: Product;
  @Input() productskuSelected: any;
  currentRate = 0;
  stars: number[] = [1, 2, 3, 4, 5];
  selectedValue: number = 0;
  productSku: any;
  productSkuId: any;
  customerId: any = 10;
  starList: boolean[] = [true, true, true, true, true];  // creating list of 5 stars
  ratingValue: number;
  submitted = false;
  selectedStar: boolean = false;
  private productReview: ProductReview;
  recommendedFlagForm: UntypedFormGroup;
  constructor(private productReviewService: ProductReviewService,
    private route: ActivatedRoute, private router: Router,
    private _appService: AppService) {
  }

  ngOnInit() {
    this.customerName = localStorage.getItem('firstName');
    console.log("Logged in Customer name:", this.customerName)
    if (localStorage.getItem('firstName')) {
      this.customerName = localStorage.getItem('firstName');
      console.log(this.customerName)
      this.customerId = 1;
    }
    {
      this.customerId = this._appService.userdetails.userId;;

    }
    this.productSku = this.productskuSelected;
    console.log(this.productSku);
    console.log("seleted SkuId for Product Review: ", this.productskuSelected);
    console.log(this.currentTileProductDetail);
    this.productSkuId = this.productSku[0].productSkuId;
    console.log("Current skuid: ", this.productSkuId);
  }
  //counting of stars on click,and according to that value we are changing the value of that star in list.
  setStar(data: any) {
    console.log(data);

    for (var i = 0; i <= 4; i++) {
      if (i <= data) {
        this.starList[i] = false;
      }
      else {
        this.starList[i] = true;
      }
    }
    this.ratingValue = data + 1;
  }

  clearStar() {
    for (let i = 0; i <= 4; i++) {
      this.starList[i] = true;
      console.log("In clear star function");
    }
  }
  //add class to star
  addClass(star) {

    console.log("selectedvalue: ", this.selectedValue);
    let ab = "";
    for (let i = 0; i < star; i++) {
      console.log("star i", star);
      ab = "starId" + i;
      document.getElementById(ab).classList.add("selected");
    }

  }

  //remove class form star
  removeClass(star) {
    console.log("removestar: ", star);
    let ab = "";
    for (let i = star - 1; i >= this.selectedValue; i--) {
      console.log("star i: ", star);
      ab = "starId" + i;
      document.getElementById(ab).classList.remove("fa-star");
    }

  }
  // onSubmit(productReviewForm) {

  //   console.log("Submitted...", productReviewForm.value);
  //   this.submitted = true;

  //   this.productReviewService.submitReview(productReviewForm.value).subscribe((data: any) => {
  //     this.productReview = data;
  //     console.log("this.productReview", this.productReview);

  //   });
  //   if (productReviewForm.valid) {
  //     console.log("product review resetted..");
  //     alert("Your product review submitted");
  //     productReviewForm.reset();
  //   }
  //   else {
  //     alert("Please check review details");
  //     console.log("error")
  //   }
  // }
  onSubmit(productReviewForm: NgForm) {
    if (productReviewForm.invalid) {
      alert("Please enter the form");
      return;
    }

    console.log("Submitted...", productReviewForm.value);
    this.submitted = true;

    this.productReviewService.submitReview(productReviewForm.value).subscribe((data: any) => {
      this.productReview = data;
      console.log("this.productReview", this.productReview);
    });

    if (productReviewForm.valid) {
      console.log("product review resetted..");
      alert("Your product review submitted");
      productReviewForm.reset();
       window.location.reload();
    } else {
      alert("Please check review details");
      console.log("error");
    }
  }

  onCancel(form: NgForm) {
    console.log("In onCancel method");
    form.reset();
  }

  hideProductReview() {
    let displaySetting = document.getElementById("productreviewhtml");
    if (displaySetting.style.display === "block") {
      displaySetting.style.display = "none";
    } else {
      displaySetting.style.display = "block";
    }

    console.log("Thanks for feedback");
  }

}
