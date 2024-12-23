/*
 *   Copyright (c) 2023 Dmantz Technologies private limited
 *   All rights reserved.
 */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Product, productsku, WishList, WishListSku } from 'src/app/data/hero';
import { AppService } from 'src/app/sharedServices/app.service';
import { GetOrderInfoServiceService } from 'src/app/sharedServices/get-order-info-service.service';
import { OrderService } from 'src/app/sharedServices/order.service';
import { WishListService } from 'src/app/sharedServices/wish-list.service';
import { ThemeService } from 'src/app/theme.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {

  public favoriteLengthChange = new Subject();
  wishlist: WishListSku[] = [];
  userId: number;
  constructor(private wishlistService: WishListService, private router: Router, private orderService: OrderService, private getOrderInfoService: GetOrderInfoServiceService,
    private _appService: AppService,
    public themeService:ThemeService) {
  }

  ngOnInit() {
    this._appService.setShowBanner(false);
    this._appService.setShowMenuIcons(false);
    this._appService.setShowDeals(false);
    console.log("enter user credentials in login component", localStorage.getItem('firstName'));
    let noOfItemsInCart = this.getOrderInfoService.get("cartLength");   // these below lines added by shashikanth.
    console.log("no of items in cart is. ", noOfItemsInCart);
    this.orderService.cartLengthChange.next(noOfItemsInCart);

    if (localStorage.getItem('firstName') == null || localStorage.getItem('firstName') == "" || localStorage.getItem('firstName') == "Please sign in" || localStorage.getItem('firstName') == 'null') {
      console.log("enter user credentials in login component", localStorage.getItem('firstName'));
      if (this._appService.userdetails.firstName == 'null')
        this.router.navigate(['/main/header/subheader/login']);
      else
        this.loadWishlistItems();
    }
    else {
      console.log("else block.");

      this.loadWishlistItems();
    }
  }

  loadWishlistItems() {
    this.userId = this._appService.getUser().userId;
    this.wishlistService.getWishlist(this.userId).subscribe(wishlistItems => {
      this.wishlist = wishlistItems;
      console.log("products in wishlist: ", wishlistItems);
      this._appService.wishlistSkuDetails = wishlistItems;
      
    })

  }

}
