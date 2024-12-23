/*
 *   Copyright (c) 2023 Dmantz Technologies private limited
 *   All rights reserved.
 */
import { Component, OnInit, Input } from '@angular/core';
import { ProductIndex, IAlert, Product, FilterCriteria, FilterCriteriaObj, WishListSku } from 'src/app/data/hero';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { FilterDataService } from 'src/app/sharedServices/filter-data.service';
import { OrderService } from 'src/app/sharedServices/order.service';
import { WishListService } from 'src/app/sharedServices/wish-list.service';
import { ProductListService } from 'src/app/Product/product-list/productListService';
import { AppService } from 'src/app/sharedServices/app.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-search-tile',
  templateUrl: './search-tile.component.html',
  styleUrls: ['./search-tile.component.css']

})
export class SearchTileComponent implements OnInit {

  @Input() addedToWishlist: boolean;
  @Input() resultSearch: ProductIndex;
  public searchresultList: any;
  private id;
  private Id;
  private productName;
  private productIdSelected;
  private saveProductDetails;
  private skuidtesting: any;
  private viewOrder;
  private cartLengthChanged;
  private imagesBaseUrl: string;
  public alert: Array<IAlert> = [];
  ownerfilterData: any;
  categoryfilterData: any;
  constructor(private route: ActivatedRoute, private router: Router, private orderService: OrderService,
    private filterDataService: FilterDataService, private wishListSer: WishListService, private wishlistService: WishListService,
    private productListService: ProductListService, private _appService: AppService) {
    this.cartLengthChanged = this.orderService.cartLengthChange;
  }

  ngOnInit() {
    this._appService.setShowBanner(true);
    this._appService.setShowDeals(true);
    this._appService.setShowMenuIcons(true);
    this.imagesBaseUrl = environment.imagesBaseUrl;
    console.log("this.resultSearch",this.resultSearch);

    var userId = this._appService.getUser().userId;
    this.wishListSer.getWishlist(userId).subscribe(wishlistData => {
      this._appService.wishlistSkuDetails = wishlistData;
      console.log("wishlistData in subscribe() is. ", wishlistData);

    });
  }
  getDetails(sku_id) {
    this.skuidtesting = sku_id;
    console.log(sku_id);
    this.productIdSelected = sku_id;
    console.log("productimage was selected");
    console.log(this.productIdSelected);
    this.router.navigate(['/main/header/subheader/productDetail', sku_id]);

  }
  getDetail(sku_id, productdetails, product) {
    this.skuidtesting = sku_id;
    console.log(product);
    console.log(productdetails);
    console.log('selected skuid',sku_id);
    this.productIdSelected = sku_id;
    console.log("productimage was selected");
    console.log(this.productIdSelected);
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "product": JSON.stringify(product),
        "productSkuId": productdetails.productSkuId,
        "imageUrl": productdetails.imageUrl,
        "price": productdetails.price,
        "productSkuCd": productdetails.productSkuCode,
        "avgCustomerRating": productdetails.avgCustomerRating,
        "ratingCount": productdetails.avgCustomerRating

      }
    };
    console.log(navigationExtras);
    this.router.navigate(['/main/header/subheader/productDetail', productdetails._source.productId,this.productIdSelected]);
  }

  addToCart(sku_id, productId) {
    console.log("this is productId. ", productId);
    console.log("this is productSkuId. ", sku_id);
    console.log("entered into addToCart(.,.) in seach-tile.component.ts file.");

    var userdetails: any;
    var firstName: string;
    userdetails = this._appService.getUser();
    if (userdetails !== undefined) {
      firstName = userdetails.firstName;
      console.log('user detail', userdetails);
      console.log("firstName product-tile.component is. ", firstName);
    }
    else {
      firstName = undefined;
    }
    if (userdetails === undefined || firstName === undefined) {
      console.log("if(firstName===undefined || firstName=== undefined),name is undefined. ");
      this.router.navigate(['/main/header/subheader/login']);
    }
    if (firstName !== undefined) {
      console.log('if(firstName!==undefined),name is. ', firstName);
      var inputParam1 = new FilterCriteria();
      inputParam1.catalogId = 0;
      inputParam1.filterEnabled = "shashikanth";
      var inputParam = new FilterCriteriaObj();
      inputParam.filterCriteria = inputParam1;
      this.productListService.getProductList(inputParam).subscribe(
        (products: any) => {
          var productsList = products.products;
          console.log("products list: ", productsList);
          var currentProductDetails: Product;
          currentProductDetails = productsList.filter(product => product.productSkus.find(item => item.productSkuId == sku_id));
          var productSkuDetails = currentProductDetails[0].productSkus.find(sku => sku.productSkuId = sku_id);
          console.log("this is currentproductdetails. ", currentProductDetails[0].productManufacturerName);
          console.log("this is productSkuDetails. ", productSkuDetails);
          this.orderService.addToCart(productSkuDetails, sku_id, 1, currentProductDetails[0]);

        });

    }

  }
  createOrder(productdetils: Product, sku_id) {

    console.log(productdetils);
    this.skuidtesting = sku_id;

    this.saveProductDetails = productdetils;
    console.log(this.saveProductDetails);
    console.log(sku_id);
    this.router.navigate(['/main/header/subheader/cart', sku_id]);

  }

  handleAddToWishlist(productdetails, skuId) {

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
      this.addedToWishlist = true;
      this.wishListSer.addToWishlist(skuId, userdetails.userId).subscribe();
      var userId = this._appService.getUser().userId;
      this.wishlistService.getWishlist(userId).subscribe(wishlistData => {
        this._appService.wishlistSkuDetails = wishlistData;
      });
    }

  }
  handleRemoveFromWishlist(productdetails, skuId) {
    var userId = this._appService.getUser().userId;
    this.wishlistService.removeFromWishlist(userId, skuId).subscribe(() => {
      this.addedToWishlist = false;
      var userId = this._appService.getUser().userId;
      this.wishlistService.getWishlist(userId).subscribe(wishlistData => {
        this._appService.wishlistSkuDetails = wishlistData;
      });
    })

  }

  handleFavorite(productSkuDetails, sku_id) {

    var dynamicId = "fav-icon-" + sku_id;
    var className: string;
    var addClassName: string = "fa fa-heart-o fav";
    var removeClassName: string = "fa fa-heart";

    className = document.getElementById(dynamicId).getAttribute("class");

    var inputParam1 = new FilterCriteria();
    inputParam1.catalogId = 0;
    inputParam1.filterEnabled = "shashikanth";
    var inputParam = new FilterCriteriaObj();
    inputParam.filterCriteria = inputParam1;
    this.productListService.getProductList(inputParam).subscribe(
      (products: any) => {
        var productsList = products.products;
        console.log("products list: ", productsList);
        var currentProductDetails: Product;
        currentProductDetails = productsList.filter(product => product.productSkus.find(item => item.productSkuId == sku_id));
        var productSkuDetails = currentProductDetails[0].productSkus.find(sku => sku.productSkuId = sku_id);

        if (className == removeClassName) {
          this.handleRemoveFromWishlist(productSkuDetails, sku_id);
          document.getElementById(dynamicId).className = addClassName;
        } else {
          this.handleAddToWishlist(productSkuDetails, sku_id);
          document.getElementById(dynamicId).className = removeClassName;
        }

      });

  }

  isFavorite(skuId) {
    var wishlistDetails = this._appService.wishlistSkuDetails;
    if (wishlistDetails === undefined) {
      return false;
    } else {
      if (wishlistDetails.some(fav => fav.productSkuId === skuId)) {
        return true;
      }
      else
        return false;
    }
  }


}
