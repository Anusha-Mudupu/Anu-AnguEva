/*
 *   Copyright (c) 2023 Dmantz Technologies private limited
 *   All rights reserved.
 */
import { Component, Input, OnInit } from '@angular/core';
import { Product, ProductReview, Rating } from 'src/app/data/hero';
import { GetOrderInfoServiceService } from 'src/app/sharedServices/get-order-info-service.service';
import { ProductReviewService } from 'src/app/sharedServices/product-review.service';

@Component({
  selector: 'app-customerreviews',
  templateUrl: './customerreviews.component.html',
  styleUrls: ['./customerreviews.component.css']
})
export class CustomerreviewsComponent implements OnInit {
  currentRate = 3;
  @Input() currentTileProductDetail: Product;
  @Input() productskuSelected: any;
  customerReview: any;
  public selectedSku: any;
  public reviewSummary: Rating[] = [];
  public reviewDescription:any;
  public reviewSummary1:ProductReview[] = []
  customername: any;
  skuid: any;
  userId:any
  loading: boolean=true;
  curOrder: any;
  customerId: string;
  custName: any;
  constructor(private reviewService: ProductReviewService,private getOrderInfoService:GetOrderInfoServiceService) { }

  ngOnInit() {
    this.productskuSelected;
    this.selectedSku = this.productskuSelected;
    this.customername = localStorage.getItem('firstName');
    setTimeout(()=>{
      this.loading=false
    },3000);
    
  }
  
  ngOnChanges() {
    this.selectedSku = this.productskuSelected[0];
    this.skuid = this.selectedSku.productSkuId;
    
    this.getReviewById();
  }
  getReviewById() {
    this.reviewService.getReview(this.skuid).subscribe((data: any) => {
      console.log(data);
      this.customerReview = data;
      console.log("customer review: ", this.customerReview);
      
      this.reviewDescription = this.customerReview.reviewDescription;
      this.reviewSummary = this.customerReview.reviewSummary;
     
      console.log("this.reviewSummary1",this.reviewSummary1);
      console.log("firstname",this.reviewDescription[0].firstName);
      console.log(this.reviewSummary);
    });
  }
}
