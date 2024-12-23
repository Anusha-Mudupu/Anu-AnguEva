/*
 *   Copyright (c) 2023 Dmantz Technologies private limited
 *   All rights reserved.
 */
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Input } from '@angular/core';

import { Product } from '../../../data/hero';
import { Router, NavigationExtras } from '@angular/router';
import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { ProductDetailNotifyService } from '../../../sharedServices/product-detail-notify.service';
import { OrderService } from 'src/app/sharedServices/order.service';
import { ProductDetailComponent } from '../product-detail.component';
import { Subscription } from 'rxjs';
import { DropdownNotifyService } from 'src/app/sharedServices/dropdown-notify.service';
import { WishListService } from 'src/app/sharedServices/wish-list.service';

import { AppService } from 'src/app/sharedServices/app.service';
import { environment } from 'src/environments/environment';
import { BannerService } from 'src/app/sharedServices/banner.service';
import { DomSanitizer } from '@angular/platform-browser';

interface carouselImage {
  imageUrl: any;

}

@Component({
  selector: 'app-product-detail-tile',
  templateUrl: './product-detail-tile.component.html',
  styleUrls: ['./product-detail-tile.component.css']
})
export class ProductDetailTileComponent implements OnInit {
  @Input() indicators = true
  @Input() controls = true;
  selectedIndex = 0;




  @Input() currentTileProductDetail: Product;
  @Input() currentTileProduct: Product;
  @Input() resultvaluearray: any;
  @Input() resultnamearray: any;
  @Input() map: any;
  @Input() productskuSelected: any;
  // @Input() productskuSelected:carouselImage[]=[] ;

  @Output() productDetailToCart = new EventEmitter();
  private Id;
  private selectoptionarray = [];
  private saveProductDetails;
  public productSkuIdList = [];
  private optionPairs = new Map();
  private optionpairlistfromMap = [];
  _subscription: Subscription;
  private skuSelected;
  public nrSelect = [];
  public optionvaluelen;
  private newOptionPairs = [];
  public addedToWishlist: boolean;
  private filteredProductSku: any;
  isDisabled;
  imageUrl: string;
  imgurl1 = "https://rukminim1.flixcart.com/image/880/1056/k65d18w0pkrrdj/shoe/z/3/9/9-vertigo-lotto-original-imaewa2szgjhpg7u.jpeg?q=50";

  imgurl2 = "https://rukminim1.flixcart.com/image/880/1056/k65d18w0pkrrdj/shoe/z/3/9/9-vertigo-lotto-original-imaewa2suhrtgkpw.jpeg?q=50";
  public addOrRemoveWishList: AppService;

  imagesBaseUrl: string;
  myObjectString: any;
  myObject: any;
  loading: boolean = true;
  showAlertMessage: boolean = false;
  showDownloadSuccess = false;
  showDownloadFailure = false;
  linkText = 'Copy Link';
  productId: 64;
  constructor(private router: Router, private wishListService: WishListService, private orderService: OrderService,
    private _dropdownNotifyService: DropdownNotifyService,
    private _appService: AppService,
    private sanitizer: DomSanitizer,
    private bannerService: BannerService,
    private route: Router,

  ) { }


  ngOnInit() {
    gtag("event", "view_item", {
      currency: "USD",
      value: 30.03,

    });
    console.log("map", this.map)
    // console.log("this.map.optionValue",this.map.optionName)
    this._appService.setShowBanner(false);
    this._appService.setShowDeals(false);
    this._appService.setShowMenuIcons(false);

    var userId = this._appService.getUser().userId;
    this.wishListService.getWishlist(userId).subscribe(wishlistData => {
      this._appService.wishlistSkuDetails = wishlistData;
      console.log("wishlistData in subscribe() is. ", wishlistData);

    });
    setTimeout(() => {
      this.loading = false
    }, 500);
    this.imagesBaseUrl = environment.imagesBaseUrl;
    console.log("this.productskuSelected is. ", this.productskuSelected);

    console.log("typeof(this.currentTileProductDetail) is. ", typeof (this.currentTileProductDetail));
    this._subscription = this._dropdownNotifyService.notifyObservable.subscribe(
      data => {

        this.skuSelected = this.currentTileProductDetail.productSkus.filter(sku => sku.productSkuId == data);
        console.log("this.skuSelected is. ", this.skuSelected);
      });
    console.log("this.currentTileProductDetail is.", this.currentTileProductDetail);
    this.Id = this.currentTileProductDetail;
    console.log("this.Id is. ", this.Id);
    console.log("this.map is. ", this.map);
    var key = Array.from(this.map.values())[0];
    console.log("key is. ", key);
    this.nrSelect.push(key);
    for (let keys of Array.from(this.map.keys())) {
      console.log("keys is. ", keys);
      this.map.get(keys);
      console.log("this.map.get(keys) is. ", this.map.get(keys));
      this.optionvaluelen = this.map.get(keys).length;

      console.log("this.nrSelect is. ", this.nrSelect);
    }
    var i, l = this.currentTileProductDetail.productSkus.length;
    let parsingString = null;
    let paringList = [];

    for (i = 0; i < l; i++) {
      console.log(i);
      var j, len = this.productskuSelected[0].options.length, flags = [];
      paringList = [];
      parsingString = this.currentTileProductDetail.productSkus[i].productSkuId;
      this.productSkuIdList.push(parsingString);
      console.log("this.productSkuIdList is. ", this.productSkuIdList);

      console.log("len is. ", len);
      for (j = 0; j < len; j++) {
        if (flags[this.currentTileProductDetail.productSkus[i].options[j].optionName]) continue;
        flags[this.currentTileProductDetail.productSkus[i].options[j].optionName] = true;
        if (flags[this.currentTileProductDetail.productSkus[i].options[j].optionValue]) continue;
        flags[this.currentTileProductDetail.productSkus[i].options[j].optionValue] = true;
        let optionDetails = this.currentTileProductDetail.productSkus[i].options[j].optionValue;
        console.log("optionDetails are.", optionDetails);
        paringList.push(optionDetails);
        console.log("this.productskuSelected[0].options[j].optionValue ", this.productskuSelected[0].options[j].optionValue);


        console.log("paringList is. ", paringList);

      }
      console.log("paringList is. ", paringList);
      console.log("parsingString is.", parsingString);
      this.optionPairs.set(parsingString, paringList);
      paringList = [];
      this.newOptionPairs = this.optionPairs.get(this.productskuSelected[0].productSkuId);
      console.log("option pairs of productskuselected", this.newOptionPairs);

    }
    console.log("this.optionPairs is. ", this.optionPairs);
    var k, len = this.productskuSelected[0].options.length, SelectedskuOptions = [];
    for (let keys of Array.from(this.optionPairs.keys())) {
      if (this.productskuSelected[0].productSkuId == keys) {
        for (k = 0; k < len; k++) {
          let optionDetails = this.productskuSelected[0].options[k].optionValue;
          console.log("optionDetails are.", optionDetails);
          SelectedskuOptions.push(optionDetails);
          console.log("this.optionPairs.get(this.productskuSelected[0].productSkuId) is. ", this.optionPairs.get(this.productskuSelected[0].productSkuId));

        }



      }
      console.log("value of sku", keys);
      console.log("selectedOptions are. ", SelectedskuOptions);
      this.nrSelect = SelectedskuOptions;
      console.log("this.nrSelect is. ", this.nrSelect);
      if (SelectedskuOptions == this.optionPairs.get(this.productskuSelected[0].productSkuId)) {
        console.log("entered");
      }
    }
  }
  showPolicies: boolean = false;
  dropdownOpen = false;
  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }
  closeModal1(productSkuId: number) {
    const modal = document.getElementById('myModal1' + productSkuId);
    modal.style.display = 'none';
  }
  togglePolicies() {
    this.showPolicies = !this.showPolicies;
  }
  get mapKeys() {
    return Array.from(this.map.keys());
  }
  updateTable(val) {

    console.log("val.target.value is. ", val.target.value);
    let selectval = val.target.value;
    this.selectoptionarray.push(selectval);
    console.log("this is this.selectoptionarray.", this.selectoptionarray);
    console.log("this.productskuSelected ", this.productskuSelected);

    this.productskuSelected[0].options[1].optionValue = val.target.value;
    console.log("this.productskuSelected[0].option[0].optionValue is. ", this.productskuSelected[0].options[0].optionValue);
    console.log("this.productskuSelected[0].option[1].optionValue is. ", this.productskuSelected[0].options);

    console.log("this.selectoptionarray is. ", this.selectoptionarray);

    if (this.selectoptionarray.length <= this.optionvaluelen) {
      this.selectoptionarray.push(this.nrSelect[0]);
      console.log("this.selectoptionarray is. ", this.selectoptionarray);
      console.log("this.optionPairs.values() are. ", this.optionPairs.values());
      for (let selectopt of this.optionPairs.values()) {
        console.log(selectopt);
        console.log("JSON.strigify(this.selectoptionarray) is. ", JSON.stringify(this.selectoptionarray));
        console.log(this.selectoptionarray.sort().join(',') === selectopt.sort().join(','));
        if (JSON.stringify(this.selectoptionarray) == JSON.stringify(selectopt)) {
          console.log("entered into compare");

          console.log(this.optionPairs.keys());
          for (let entry of Array.from(this.optionPairs.entries())) {
            let key = entry[0];
            let value = entry[1];
            console.log(value);
            console.log(key);
            if (JSON.stringify(value) == JSON.stringify(this.selectoptionarray)) {
              console.log(entry.keys);
              console.log(key);
              var newProductskuId = key;
              console.log(newProductskuId);
              this.selectoptionarray = [];
              this.productskuSelected = this.currentTileProductDetail.productSkus.filter(sku => sku.productSkuId == newProductskuId);
              console.log("this.productskuSelected", this.productskuSelected);
              console.log("option pairs of productskuselected", this.optionPairs.get(this.productskuSelected[0].productSkuId));
              let navigationExtras: NavigationExtras = {
                queryParams: {
                  "product": JSON.stringify(this.currentTileProductDetail)
                }
              };
              this.router.navigate(['/main/header/subheader/productDetail', navigationExtras.queryParams.product, newProductskuId]);
              this.selectoptionarray = [];
            }


          }

        }

      }

    }
    else {
      this.selectoptionarray = [];
    }

  }

  setValue() {
    const test = {
      "imageUrl": "German Silver designed jumkas.jpg",
      "price": 300,
      "productSkuCd": "GHEE001",
      "productSkuId": 374
    }

    localStorage.setItem('myKey', JSON.stringify(test))

  }

  getValue() {

    const myObjectString = localStorage.getItem('myKey');
    const myObject = JSON.parse(myObjectString);
    console.log(myObject);
  }

  test: any;

  getDetails(productskuSelected, sku_id, currentTileProductDetail) {
    gtag("event", "add_to_cart", {
      currency: "USD",
      value: 30.03,
      items: [
        {
          item_id: sku_id,

        }
      ]
    });
    this.showAlertMessage = true;
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

      this.router.navigate(['/main/header/subheader/login']);
    }

    if (firstName !== undefined) {
      console.log('if(firstName!==undefined),name is. ', firstName);
      let displaySetting;
      console.log("navigate to product review");
      console.log("productskuSelected.options are. ", productskuSelected.options);
      console.log("Product Details are.", currentTileProductDetail);
      console.log("productskuSelected is. ", productskuSelected);
      console.log("product sku_id is. ", sku_id);
      // console.log("productskuSelected.options[0] is. ", productskuSelected.options[0]);
      // console.log("productskuSelected.options[1] is. ", productskuSelected.options[1]);
      this.orderService.addToCart(productskuSelected, sku_id, 1, currentTileProductDetail);
      // customer_Name
    }
    const modal = document.getElementById('myModal');
    modal.style.display = 'block';

    setTimeout(() => {
      this.closeModal();
    }, 1100);

  }
  addToCart(productdetils: Product, sku_id) {
    console.log(Product);

    this.orderService.addItem(productdetils, sku_id);


  }

  imageBox(url) {
    console.log("imageUrl is for new es. ", url);
    this.imageUrl = url;

  }

  proceedToPay() {
    this.router.navigate(['/main/header/subheader/shippingAddress']);
  }
  createOrder(productdetils: Product, sku_id) {
    console.log(productdetils);
    this.saveProductDetails = productdetils;
    console.log(this.saveProductDetails);
    console.log(sku_id);
    this.router.navigate(['/main/header/subheader/cart', sku_id]);

  }

  rating() {
    document.getElementById("customerstarrating").style.display = "block";
  }
  handleRemoveFromWishlist(skuId) {


    var userId = this._appService.getUser().userId
    this.wishListService.removeFromWishlist(userId, skuId).subscribe(() => {
      this.addedToWishlist = false;
      console.log(skuId + " Products removed to wishlist " + this.addedToWishlist)
      alert(skuId + ' Removed from wishlist ' + this.addedToWishlist)

      var userId = this._appService.getUser().userId;
      this.wishListService.getWishlist(userId).subscribe(wishlistData => {
        this._appService.wishlistSkuDetails = wishlistData;

      });

    });
    const modal = document.getElementById('Modal' + skuId);
    modal.style.display = 'block';

    setTimeout(() => {
      this.removeModal(skuId);
    }, 1500);
  }
  removeModal(productSkuId: number) {
    const modal = document.getElementById('Modal' + productSkuId);
    modal.style.display = 'none';
  }
  handleAddToWishlist(skuId) {
    const modal = document.getElementById('myModal1' + skuId);
    modal.style.display = 'block';

    setTimeout(() => {
      this.closeModal1(skuId);
    }, 2000);
    this.addedToWishlist = true;
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
      console.log('if(firstName!==undefined),name is. ', firstName);
      console.log("value in addedToWishlist is.", this.addedToWishlist);
      console.log("value in addedTowishlist is. ", this.addedToWishlist);
      this.addedToWishlist = true;
      this.wishListService.addToWishlist(skuId, userdetails.userId).subscribe();
    }
    var userId = this._appService.getUser().userId;
    this.wishListService.getWishlist(userId).subscribe(wishlistData => {
      this._appService.wishlistSkuDetails = wishlistData;


    });
  }


  changeProductSkuOptions(val) {

    // STEP 1: Collect user selected option names and values

    let selectedOptions = new Map();
    this.mapKeys.forEach(item => {

      let selValue = (document.getElementById(item.toString()) as HTMLSelectElement).value;

      selectedOptions.set(item, selValue);
    });


    //STEP 2: Find product sku that matches with selected options


    let filteredProductSkus = this.currentTileProductDetail.productSkus;
    console.log("filteredProductSkus", filteredProductSkus)
    this.mapKeys.forEach(optionName => {

      var selectedValue = selectedOptions.get(optionName);

      filteredProductSkus = filteredProductSkus.filter(sku => {

        var filteredOptions = sku.options.filter(option => (option.optionName === optionName));
        console.log("filteredOptions ", filteredOptions);
        if (filteredOptions[0].optionValue === selectedValue) {
          console.log("filteredOptions ", filteredOptions[0].optionValue === selectedValue);
          return true;
        } else {
          this.productskuSelected[0] = filteredProductSkus[0];
          return false;
        }

      });

    });

    if (filteredProductSkus.length === 0) {
      this.productskuSelected = filteredProductSkus;
      document.getElementById("notAvailableTxt").style.display = "block";
      this.isDisabled = true;

    } else {
      this.productskuSelected[0] = filteredProductSkus[0];
      document.getElementById("notAvailableTxt").style.display = "none";
      this.isDisabled = false;

    }
    console.log("currentTileProductDetail is. ", this.currentTileProductDetail);
  }

  // handleFavorite(skuId: number) {
  //   gtag("event", "add_to_wishlist", {
  //     currency: "USD",
  //     value: 30.03,
  //     items: [
  //       {
  //         item_id: skuId,

  //       }
  //     ],
  //   });
  //   var addClassName = "fa fa-heart-o fav ";
  //   var removeClassName = "fa fa-heart ";


  //   var className = document.getElementById("wishlist").getAttribute("class");
  //   if (document.getElementById("wishlist").className == addClassName) {
  //     this.handleAddToWishlist(skuId);
  //     document.getElementById("wishlist").className = removeClassName;

  //   } else {
  //     this.handleRemoveFromWishlist(skuId);
  //     document.getElementById("wishlist").className = addClassName;
  //   }
  // }

  handleFavorite(skuId: number) {
    const wishlistElement = document.getElementById("wishlist");
    if (wishlistElement.classList.contains("fa-heart-o")) {
      this.handleAddToWishlist(skuId);
      wishlistElement.classList.remove("fa-heart-o");
      wishlistElement.classList.add("fa-heart");
    } else {
      this.handleRemoveFromWishlist(skuId);
      wishlistElement.classList.remove("fa-heart");
      wishlistElement.classList.add("fa-heart-o");
    }
  }


  isFavorite(skuId) {

    var wishlistDetails = this._appService.wishlistSkuDetails;

    if (wishlistDetails === undefined) {

      return false;
    } else {

      if (wishlistDetails.some(fav => fav.productSkuId === skuId)) {
        return true;
      }
      else {
        return false;
      }
    }

  }
  selectImage(index: number) {
    this.selectedIndex = index
  }
  onPrevClick() {
    if (this.selectedIndex === 0) {
      this.selectedIndex = this.productskuSelected[0].productSkuImageUrls.length - 1;
    }
    else {
      this.selectedIndex--;
    }
  }
  onNextClick() {
    if (this.selectedIndex === this.productskuSelected[0].productSkuImageUrls.length - 1) {
      this.selectedIndex = 0;
    }
    else {
      this.selectedIndex++;
    }
  }


  // added by raji
  closeModal() {
    // Close the modal for the specific product
    const modal = document.getElementById('myModal');
    modal.style.display = 'none';
  }
  shareToApp(app: string) {
    const productUrl = this.getProductUrl();
    const text = encodeURIComponent(`Check out this product: ${productUrl}`);

    let shareUrl = '';
    switch (app) {
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${text}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${productUrl}`;
        break;
      case 'email':
        shareUrl = `mailto:?subject=Check out this product&body=${text}`;
        break;
      case 'instagram':
        // Instagram sharing is generally done via app; you might need to use a different approach.
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${text}`;
        break;
      default:
        break;
    }

    if (shareUrl) {
      window.open(shareUrl, '_blank');
    }
  }
  copyLink(id: any,currentTileProductDetail:any) {
    var productId =currentTileProductDetail.productId
    console.log("copyLink invoked with ID:", id);
    console.log("copyLink invoked with productId:",currentTileProductDetail);
    const productUrl = `${window.location.origin}/#/main/header/subheader/productDetail/${productId}/${id}`;
    console.log("Generated product URL:", productUrl);

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(productUrl).then(
        () => {
          console.log('Link successfully copied:', productUrl);
          alert('Product link copied to clipboard!');
          // Open the URL in a new tab for testing
        },
        (err) => {
          console.error('Clipboard copy failed:', err);
          alert('Failed to copy the link. Please try again.');
        }
      );
    } else {
      console.warn('Clipboard API not available. Using fallback.');
      const textArea = document.createElement('textarea');
      textArea.value = productUrl;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        const successful = document.execCommand('copy');
        if (successful) {
          console.log('Link successfully copied (fallback):', productUrl);
          alert('Product link copied to clipboard!');
          // Open the URL in a new tab for testing
         
        } else {
          console.error('Fallback clipboard copy failed.');
          alert('Failed to copy the link. Please try again.');
        }
      } catch (err) {
        console.error('Fallback clipboard copy error:', err);
        alert('Failed to copy the link. Please try again.');
      } finally {
        document.body.removeChild(textArea);
      }
    }
  }




  downloadProduct(productSkuId: string) {
    // const downloadLink = `${this.imagesBaseUrl}${this.imageUrl}`;
    // window.open(downloadLink, '_blank');
  }

  private getProductUrl(): string {
    return window.location.href; // or construct a URL based on the product SKU
  }

}



