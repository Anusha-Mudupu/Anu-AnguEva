/*
 *   Copyright (c) 2023 Dmantz Technologies private limited
 *   All rights reserved.
 */
import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Product, ProductReview, Rating, Skus } from 'src/app/data/hero';
import { AppService } from 'src/app/sharedServices/app.service';
import { ProductReviewService } from 'src/app/sharedServices/product-review.service';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-customer-rating-summary',
  templateUrl: './customer-rating-summary.component.html',
  styleUrls: ['./customer-rating-summary.component.css']
})
export class CustomerRatingSummaryComponent implements OnInit {
  @Input() currentTileProductDetail: Product;
  @Input() productskuSelected: any;

  customerReview: any;
  skuid: any;
  public selectedSku: any;
  public reviewSummary: Rating[] = [];
  public reviewDescription: ProductReview[] = [];
  public rating1: number;
  public rating2: number;
  public rating3: number;
  public rating4: number;
  public rating5: number;
  constructor(private route: Router, private reviewService: ProductReviewService, private _appService: AppService) { }

  ngOnInit() {
    console.log(this.currentTileProductDetail);
    console.log(this.productskuSelected);
    this.selectedSku = this.productskuSelected;
    console.log(this.selectedSku);

  }
  ngOnChanges() {
    this.selectedSku = this.productskuSelected[0];
    this.skuid = this.selectedSku.productSkuId;
    console.log(this.skuid)
    console.log(this.selectedSku, ":", this.productskuSelected[0].productSkuId);
    console.log(this.currentTileProductDetail);
    this.getReviewById();

  }

  productReview() {
    var userdetails: any;
    var firstName: string;
    userdetails = this._appService.getUser();
    if (userdetails !== undefined) {
      firstName = userdetails.firstName;
      
    }
    else {
      firstName = undefined;
    }
    if (userdetails === undefined || firstName === undefined) {
    
      this.route.navigate(['/main/header/subheader/login']);
    }
    if (firstName !== undefined) {
      console.log('if(firstName!==undefined),name is. ', firstName);
      let displaySetting;
      console.log("navigate to product review");
      displaySetting = document.getElementById("productreviewhtml");
      if (displaySetting.style.display === "none") {
        displaySetting.style.display = "block";
      } else {
        displaySetting.style.display = "none";
      }

    }
  }

  getReviewById() {

    this.reviewService.getReview(this.skuid).subscribe((data: any) => {
      console.log(data);

      this.customerReview = data;
      console.log("customer review: ", this.customerReview);
      this.reviewDescription = this.customerReview.reviewDescription;
      this.reviewSummary = this.customerReview.reviewSummary;
      console.log(this.reviewDescription);
      console.log(this.reviewSummary);


      for (let k = 0; k < this.reviewSummary.length; k++) {
        if (this.reviewSummary[k].rating == 5) {
          this.rating5 = this.reviewSummary[k].count;
         
          console.log(this.reviewSummary[k].rating + ": " + this.reviewSummary[k].count);
        }
        else if (this.reviewSummary[k].rating == 4) {
          this.rating4 = this.reviewSummary[k].count;
          console.log(this.reviewSummary[k].rating + ": " + this.reviewSummary[k].count);
        }
        else if (this.reviewSummary[k].rating == 3) {
          this.rating3 = this.reviewSummary[k].count;
          console.log(this.reviewSummary[k].rating + ": " + this.reviewSummary[k].count);
        }
        else if (this.reviewSummary[k].rating == 2) {
          this.rating2 = this.reviewSummary[k].count;
          console.log(this.reviewSummary[k].rating + ": " + this.reviewSummary[k].count);
        }
        else if (this.reviewSummary[k].rating == 1) {
          this.rating1 = this.reviewSummary[k].count;
          console.log(this.reviewSummary[k].rating + ": " + this.reviewSummary[k].count);
        }
        else {
          console.log("Please give rating between 1 to 5...");
        }
      }

    });

  }
}


