/*
 *   Copyright (c) 2023 Dmantz Technologies private limited
 *   All rights reserved.
 */
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Product, IAlert, Order, ProductIndex, Skus, WishList, productsku } from '../../../data/hero';
import { Input } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { Location, JsonPipe } from '@angular/common';
import { OrderService } from 'src/app/sharedServices/order.service';
import { FilterDataService } from 'src/app/sharedServices/filter-data.service';
import { SubheaderComponent } from 'src/app/subheader/subheader.component';
import { DropdownNotifyService } from 'src/app/sharedServices/dropdown-notify.service';
import { WishListService } from 'src/app/sharedServices/wish-list.service';
import { AppService } from 'src/app/sharedServices/app.service';
import { environment } from 'src/environments/environment';
import { ThemeService } from 'src/app/theme.service';

@Component({
  selector: 'app-product-tile',
  templateUrl: './product-tile.component.html',
  styleUrls: ['./product-tile.component.css']
})
export class ProductTileComponent implements OnInit {
  public flag: boolean = false;
  public alerts: Array<IAlert> = [];
  cartItemCount: number = 0;
  productAddedTocart: Product[];
  @Input() currentTileProduct: any;
  @Input() favourites: number[];
  public productList: any;
  private Id;
  private productName;
  private productIdSelected;
  private saveProductDetails;
  private skuidtesting: any;
  private viewOrder;
  private cartLengthChanged;
  public alert: Array<IAlert> = [];
  ownerfilterData: any;
  categoryfilterData: any;
  addOrRemoveWishList: AppService;
  @ViewChild('wl') wishlistClassName: ElementRef;
  imageBaseUrl: string;
  showAlertMessage: boolean = false;
  showPopup = false;


  constructor(private router: Router, private location: Location, private _dropdownNotifyService: DropdownNotifyService, private orderService: OrderService,
    private route: ActivatedRoute, private filterDataService: FilterDataService,
    private wishlistService: WishListService, private _appService: AppService,
    public themeService: ThemeService,
  ) {
    this.cartLengthChanged = this.orderService.cartLengthChange;
  }
  ngOnInit() {
    
    this.route.queryParams.subscribe(params => {
      const catalogId = params['catalogId'];
     
      console.log('Catalog ID:', catalogId);
    });
    this.productList = this.currentTileProduct;
    var list = this.productList.price
    console.log("product tile data", this.productList )

    this.imageBaseUrl = environment.imagesBaseUrl;
    this.Id = this.currentTileProduct.productId;
    this._appService.favourites = this.favourites;

  }


  addToCart(productSku: Skus, sku_id: any, products: Product) {
    gtag("event", "add_to_cart", {
      currency: "USD",
      value: 30.03,
      items: [
        {
          item_id: sku_id,
         
        }
      ]
    });
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

      this.router.navigate(['/main/header/subheader/login']);
    }
    if (firstName !== undefined) {

      this.orderService.addToCart(productSku, sku_id, 1, products);
      // alert("product is added to cart")
    
    }

    const modal = document.getElementById('myModal' + productSku.productSkuId);
    modal.style.display = 'block';
    
      setTimeout(() => {
        this.closeModal(productSku.productSkuId);
      }, 1100);
  }

  createOrder(productdetils: Product, sku_id) {


    this.skuidtesting = sku_id;

    this.saveProductDetails = productdetils;
    console.log(this.saveProductDetails);


    this.router.navigate(['/main/header/subheader/cart', sku_id]);

  }
  handleAddToWishlist(sku_id: number, userId: number) {
    const modal = document.getElementById('myModal1' + sku_id);
      modal.style.display = 'block';
      
        setTimeout(() => {
          this. closeModal1(sku_id);
        }, 1500);
    console.log("sku_id is. ", sku_id);
   
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

      this.router.navigate(['/main/header/subheader/login']);
    }
    if (firstName !== undefined) {
     
      this.wishlistService.addToWishlist(sku_id, userId).subscribe((data) => {
      
      });

     

      this.wishlistService.getWishlist(userId).subscribe(wishlistData => {
        this._appService.wishlistSkuDetails = wishlistData;
        console.log("wishlistData in subscribe() in product-tile is. ", wishlistData);

        this.wishlistService.getFavourites(userId).subscribe(data => {
          this.favourites = data;
         
        })
       
      });
      
   
    }
    
  }
  updateOrder() {

  }
  handleRemoveFromWishlist(skuId: number, userId: number) {

    const modal = document.getElementById('Modal' + skuId);
    modal.style.display = 'block';
    
      setTimeout(() => {
        this.removeModal(skuId);
      }, 1500);
    this.wishlistService.removeFromWishlist(userId, skuId).subscribe(() => {

      alert(skuId + ' Removed from wishlist ');
      //updating wishlistDetails in AppService.
      var userId = this._appService.getUser().userId;
      this.wishlistService.getWishlist(userId).subscribe(wishlistData => {
        this._appService.wishlistSkuDetails = wishlistData;
        console.log("wishlistData in subscribe() is. ", wishlistData);
      });
      this.wishlistService.getFavourites(userId).subscribe(data => {
        this.favourites = data;
      })
    })
   
  }
  handleFavorite(skuId) {
    gtag("event", "add_to_wishlist", {
      currency: "USD",
      value: 30.03,
      items: [
        {
          item_id: skuId,
         
        }
      ],
    });
    var userId = this._appService.getUser().userId;

    var dynamicId = "fav-icon-" + skuId;
    var className: string;
    var addClassName: string = "fa fa-heart-o fav";
    var removeClassName: string = "fa fa-heart fav";

    className = document.getElementById(dynamicId).getAttribute("class");

    if (className == removeClassName) {
     
      this.handleRemoveFromWishlist(skuId, userId);
      document.getElementById(dynamicId).className = addClassName;
      // const modal = document.getElementById('Modal' + skuId);
      //   modal.style.display = 'block';
        
      //     setTimeout(() => {
      //       this.removeModal(skuId);
      //     }, 2000);
    }
   
    else {

      this.handleAddToWishlist(skuId, userId);
      document.getElementById(dynamicId).className = removeClassName;
      const modal = document.getElementById('myModal1' + skuId);
      modal.style.display = 'block';
      
        setTimeout(() => {
          this. closeModal1(skuId);
        }, 2000);
      }
  }


closeModal1(productSkuId: number){
  const modal = document.getElementById('myModal1' + productSkuId);
  modal.style.display = 'none';
}
removeModal(productSkuId: number){
  const modal = document.getElementById('Modal' + productSkuId);
  modal.style.display = 'none';
}
  isFavorite(skuId: number) {
   
    var favourites = this.favourites;
    if (favourites === undefined) {
    
      return false;
    } else {

      if (favourites.includes(skuId)) {
        
        return true;
      }
      else
      
        return false;
        
    }
    
    
  }
  // coded on Dec-10-2022
  productDetailTile(skuId) {

    var dynamicId = "fav-icon-" + skuId;
    var className: string;
    var addClassName: string = "fa fa-heart-o fav";
    var removeClassName: string = "fa fa-heart fav";
    className = document.getElementById(dynamicId).getAttribute("class");
    if (className == removeClassName) {
      this._appService.addOrRemoveWishListClassName = true; // added on Dec-9-2022  
    }
    else {
      this._appService.addOrRemoveWishListClassName = false; // added on Dec-9-2022
    }

  }
  // added by raji
  closeModal(productSkuId: number) {
    // Close the modal for the specific product
    const modal = document.getElementById('myModal' + productSkuId);
    modal.style.display = 'none';
  }
  
  
}

