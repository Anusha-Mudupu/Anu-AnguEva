/*
 *   Copyright (c) 2023 Dmantz Technologies private limited
 *   All rights reserved.
 */
import { Component, OnInit } from '@angular/core';
import { BannerService } from 'src/app/sharedServices/banner.service';
import { Banner } from 'src/app/data/hero';
import { Router } from '@angular/router';
import { AppService } from 'src/app/sharedServices/app.service';
import { ThemeService } from 'src/app/theme.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {

  banner: string = "shashikanth";
  bannerData: any;
  bannerImg2: any;
  bannerImg3: any;
  bannerImg4: any;
  private imageurls = [];
  private first;
  private noOfImages: number;
  loading:boolean=true;
  loading1: boolean;

  constructor(private bannerService: BannerService,
     private route: Router,
      private _appService: AppService,
      public themeService:ThemeService) { }

  ngOnInit() {

    
  
    var banner: boolean = this._appService.isShowBanner();

    this.bannerService.getBanner().subscribe(data => {
      // setTimeout(()=>{
      //   this.loading1=false
      // },100);
      this.bannerData = <any>data;
     
   
      console.log("initialized bannerData: ", this.bannerData);
      var i, l = this.bannerData.length;
      for (i = 0; i < l; i++) {
        this.imageurls.push(this.bannerData[i].imageURL);
        console.log(this.imageurls);
      }
     
   
      console.log("calling getBanner() in BannerComponent" + this.bannerData[0].imageURL);
      this.first = this.imageurls[0];
      this.noOfImages = this.bannerData.length;
      console.log("noOfImages are: ", this.noOfImages);
    });
   
    $('.carousel[data-type="multi"] .item').each(function () {
      let next = $(this).next();
      if (!next.length) {
        next = $(this).siblings(':first');
      }
      next.children(':first-child').clone().appendTo($(this));

      for (let i = 0; i < 3; i++) {
        next = next.next();
        if (!next.length) {
          next = $(this).siblings(':first');
        }

        next.children(':first-child').clone().appendTo($(this));
      }
    });

  }

  bannerImg(index: number) {
   
    let i: number = index;
    for (let k = 0; k < this.noOfImages; k++) {
      switch (i) {

        case k:
      
          alert("you have clicked bannerImg" + (k + 1));
          break;

      }
    }
  }

}
