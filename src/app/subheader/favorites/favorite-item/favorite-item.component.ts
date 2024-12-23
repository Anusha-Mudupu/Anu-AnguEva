/*
 *   Copyright (c) 2023 Dmantz Technologies private limited
 *   All rights reserved.
 */
import { Component, Input, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { FilterCriteria, FilterCriteriaObj, Product, WishListSku } from 'src/app/data/hero';
import { ProductListService } from 'src/app/Product/product-list/productListService';
import { AppService } from 'src/app/sharedServices/app.service';
import { OrderService } from 'src/app/sharedServices/order.service';
import { WishListService } from 'src/app/sharedServices/wish-list.service';
import { ThemeService } from 'src/app/theme.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-favorite-item',
  templateUrl: './favorite-item.component.html',
  styleUrls: ['./favorite-item.component.css']
})
export class FavoriteItemComponent implements OnInit {

  @Input() wishlistItem: WishListSku;
  private addedToWish: boolean;
  products: any;
  productSkus: any;
  item: any;
  productsList: Product[];
  currentProductDetails: any;
  imagesBaseUrl: string;
  loading: boolean=true;

  constructor(private wishlistService: WishListService, private router: Router, private orderService: OrderService, private productListService: ProductListService,
    private _appService: AppService,
    public themeService:ThemeService) { }

  ngOnInit() {
    this._appService.setShowBanner(false);
    this._appService.setShowDeals(false);
    this._appService.setShowMenuIcons(false);
    this.imagesBaseUrl = environment.imagesBaseUrl;
    console.log(this.wishlistItem);
    this.item = this.wishlistItem;
    console.log("wishlist data: ", this.item);
    console.log(this.wishlistItem.productSkuId)
    this._appService.addOrRemoveWishListClassName = true; // added on Dec-12-2022
    setTimeout(()=>{
      this.loading=false
    },1000);
  
  }
  handleRemoveFromWishlist(skuId) {
    console.log(this.wishlistItem);
    var userId = this._appService.getUser().userId;

    console.log("sku_id is.", skuId);
    this.wishlistService.removeFromWishlist(userId, skuId).subscribe(() => {
      this.addedToWish = false;
      //updating wishlistDetails.
      var userId = this._appService.getUser().userId;
      this.wishlistService.getWishlist(userId).subscribe(wishlistData => {
        this._appService.wishlistSkuDetails = wishlistData;
        console.log("wishlistData in subscribe() is. ", wishlistData);
      })

    })

    // to delete from wishlist.
    // document.getElementById(skuId).remove();
    console.log("Removed From Wishlist");
    window.location.reload();
  }

  getDetail(skuId, productId) {
    console.log(skuId);
    this.router.navigate(['/main/header/subheader/productDetail', productId, skuId]);
    console.log("productId is. ", productId);
  }
  addToCart(productdetails, sku_id, quantity) {
    console.log("productdetails are. ", productdetails);
    console.log("sku_id is. ", sku_id);
    console.log("quantity is. ", quantity);
    const inputParam1 = new FilterCriteria();
    inputParam1.catalogId = 0;
    inputParam1.filterEnabled = "anyString";
    const inputParam = new FilterCriteriaObj();
    inputParam.filterCriteria = inputParam1;
    console.log("inputparam is. ", inputParam);
    this.productListService.getProductList(inputParam).subscribe(
      (products: any) => {
        this.productsList = products.products;
        console.log("value of sku_id is. ", sku_id);
        this.currentProductDetails = this.productsList.filter(product => product.productSkus.find(item => item.productSkuId == sku_id));
        console.log("this.currentProductDetails is. ", this.currentProductDetails[0]);
        this.orderService.addToCart(productdetails, sku_id, 1, this.currentProductDetails[0]);
      });
  }
}
