/*
 *   Copyright (c) 2023 Dmantz Technologies private limited
 *   All rights reserved.
 */

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/sharedServices/app.service';
import { environment } from 'src/environments/environment';
import { ProductIndex, ProductReview, Rating, trendingProduct } from '../data/hero';
import { DealsService } from '../sharedServices/deals.service';
import { ProductReviewService } from '../sharedServices/product-review.service';
import { TrendProductService } from '../sharedServices/trend-product.service';
import { ThemeService } from '../theme.service';

@Component({
  selector: 'app-daily-deals',
  templateUrl: './daily-deals.component.html',
  styleUrls: ['./daily-deals.component.css']
})
export class DailyDealsComponent implements OnInit {
  public style: any;
  public product: any;
  public span: any;
  public product_page: any;
  public movePer: any;
  public maxMove: any;
  public l: any;
  public deal: trendingProduct[]=[];
  public image: string;
  mob_view: MediaQueryList;
  loading:boolean=true;

  discount: number;
  price: number;
  discountedPrice: number;

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



  constructor(private _appService: AppService, private dealService: DealsService, private _trendProdService: TrendProductService,
    private _router: Router,
    public themeService:ThemeService,
    private reviewService: ProductReviewService) { }

  ngOnInit() {
    this.getReviewById();
    
    this.image = environment.imagesBaseUrl;
    this.getDeals();
    var DailyDeals: boolean = this._appService.isShowDeals();
    this.span = document.getElementsByTagName('span');
    this.product = document.getElementsByClassName('product');
    console.log(this.product);
 

    this.product_page = Math.ceil(this.product.length / 6);
    this.l = 0;
    this.movePer = 50.36;
    this.maxMove = 1200;
    this.style = <HTMLElement[]><any>document.querySelectorAll('li');

    // mobile_view	
    this.mob_view = window.matchMedia("(max-width: 768px)");
    if (this.mob_view.matches) {
      this.movePer = 50.36;
      this.maxMove = 504;
    }

    let right_mover = () => {
      this.l = this.l + this.movePer;
      if (this.product == <any>1) { this.l = 0; }
      for (const i of this.product) {
        if (this.l > this.maxMove) { this.l = this.l - this.movePer; }
        i.style.left = '-' + this.l + '%';
      }

    }
    let left_mover = () => {
      this.l = this.l - this.movePer;
      if (this.l <= 0) { this.l = 0; }
      for (const i of this.product) {
        if (this.product_page < 1) {
          i.style.left = '-' + this.l + '%';
        }
      }
    }
    this.span['right'].onclick = () => { right_mover(); }
    this.span['left'].onclick = () => { left_mover(); }


    $(document).ready(function () {
      $(".wish-icon i").click(function () {
        $(this).toggleClass("fa-heart fa-heart-o");
      });
    });

  }



  getDeals() {
    this._trendProdService.getTrendProductInfo().subscribe(data => {
      console.log("Trending products",data)
      this.deal = data;
      this.deal.forEach((deal) => {
       
        deal.discountedPrice = deal.price - (deal.price * deal.discount / 100) ;
     
        
      });
    
      setTimeout(()=>{
        this.loading=false
      },1000);
    
    }, error => { console.log(error); }
    )
  }
  productDetail(productId, skuId) {
  
    console.log("/main/header/subheader/productDetails/", productId, skuId);

    this._router.navigate(['/main/header/subheader/productDetail', productId, skuId]);


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

