/*
 *   Copyright (c) 2023 Dmantz Technologies private limited
 *   All rights reserved.
 */
import { Component, OnInit } from '@angular/core';
import { FilterCriteria, Product, Skus, FilterCriteriaObj, WishList, Order, WishListSku } from '../../data/hero';
// import { error } from '@angular/compiler/src/util';
import { ProductListService } from '../../Product/product-list/productListService';
import { Subscription } from 'rxjs';
import { DropdownNotifyService } from '../../sharedServices/dropdown-notify.service';
import { AuthGuardService } from 'src/app/sharedServices/auth-guard.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FilterDataService } from 'src/app/sharedServices/filter-data.service';
import { WishListService } from 'src/app/sharedServices/wish-list.service';
import { GetOrderInfoServiceService } from 'src/app/sharedServices/get-order-info-service.service';
import { OrderService } from 'src/app/sharedServices/order.service';
import { AppService } from 'src/app/sharedServices/app.service';
import { ThemeService } from 'src/app/theme.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  productManufacturerName: string;



  categoryidselected: any;
  public val;
  _subscription: Subscription;
  private productListService;
  private catalog_id;
  private filterEnabled = "true";
  // public products: Product[] = [];
  public products: any;
  public pricerangefilterData;
  public productfilterData: any;
  public avgRatingFilterData: any;
  wishlist: WishListSku[] = [];
  inputParam2: WishList;
  favourites: number[] = [];
  private viewOrder: Order;
  private order: Order;
  selectedManufacturer: string;
  filteredProducts: Product[] = [];
  totalLength: any;
  page: number = 1;
  loading: boolean = true;
  constructor(private router: Router, private route: ActivatedRoute, private _productListService: ProductListService, private _dropdownNotifyService: DropdownNotifyService,
    private filterDataService: FilterDataService,
    private wishistService: WishListService,
    private orderService: OrderService,
    private getOrderInfoService: GetOrderInfoServiceService,
    private _appService: AppService,
    public themeService: ThemeService,
  ) {

    this.filterDataService.pricerangeDataShare.subscribe(pricerangereceiveddata => {

      this.pricerangefilterData = pricerangereceiveddata;
      console.log("this.pricerangefilterData", this.pricerangefilterData)
    });

    this.filterDataService.shareDataSubject.subscribe(productreceivedata => {
      this.productfilterData = productreceivedata;
      console.log("this.productfilterData", this.productfilterData)

    });
    this.filterDataService.avgRatingData.subscribe(productRating => {
      this.avgRatingFilterData = productRating;
      console.log("this.avgRatingFilterData", this.avgRatingFilterData)
    })
  }
  ngOnInit() {
      this.route.queryParams.subscribe(params => {
      this.pricerangefilterData = params['price'] ? params['price'].split('-').map(Number) : null;
      this.avgRatingFilterData = params['rating'] ? params['rating'].split(',').map(Number) : [];
      this.productfilterData = params['productManufacturerName'] ? params['productManufacturerName'].split(',') : [];
    });


    this.route.queryParams.subscribe(params => {
      if (params['catalogId']) {
        this.categoryidselected = params['catalogId'];
        this.filterProductsByCatalogId(this.categoryidselected);

      }
      else {

        this.getAllProducts();
      }

    });

    // Subscribe to the observable to update data when dropdown selection changes
    this._subscription = this._dropdownNotifyService.notifyObservable.subscribe(
      data => {
        this.categoryidselected = data;
        console.log("this.categoryidselected", this.categoryidselected)
        this.filterProductsByCatalogId(this.categoryidselected);
      },
      error => console.log(error)
    );
 this.route.queryParams.subscribe(params => {
      this.page = +params['page'] || 1; // Get the 'page' query parameter, default to 1 if not present
    });
    this._appService.setShowBanner(true);
    this._appService.setShowDeals(true);
    this._appService.setShowMenuIcons(true);
    this.orderService.getRefreshObservable().subscribe(() => {
      this._subscription;
    })
    this.order = this.getOrderInfoService.get("order");
    if (this.order !== undefined) {
      let cartQuantity: number = 0;
      this.orderService.getRefreshObservable().subscribe(() => {
        this._subscription;
      })
      this.order.orderItemObj.forEach(item => cartQuantity = cartQuantity + parseInt(item.quantity));
      console.log('Total Items in Cart', cartQuantity);
      this.orderService.cartLengthChange.next(cartQuantity);
    }
    this.loadFavourites();
    this.loadWishlist();
    // this.route.params.subscribe(params => {
    //   this.val = params['val'];
    //   this.catalog_id = 0;
    //   this.filterEnabled = "true";
    //   const inputParam1 = new FilterCriteria();
    //   inputParam1.catalogId = this.catalog_id;
    //   inputParam1.filterEnabled = this.filterEnabled;
    //   const inputParam = new FilterCriteriaObj();
    //   inputParam.filterCriteria = inputParam1;

    //   this._productListService.getProductList(inputParam).subscribe(
    //     (products: Product[]) => {

    //       this.products = products;
    //        console.log("productlist",this.products)


    //       setTimeout(() => {
    //         this.loading = false
    //       }, 500);
    //       this.totalLength = products.length;
    //       console.log("products list: ", this.products);

    //       console.log("products list length: ", this.products["products"].length);

    //     },
    //     error => console.log(error)
    //   );

    // });

    // this._subscription = this._dropdownNotifyService.notifyObservable.subscribe(data => {
    //   if (this.categoryidselected !== data) {
    //     this.categoryidselected = data;
    //     const inputParam1 = new FilterCriteria();
    //     inputParam1.catalogId = this.categoryidselected;
    //     inputParam1.filterEnabled = this.filterEnabled;
    //     const inputParam = new FilterCriteriaObj();
    //     inputParam.filterCriteria = inputParam1;

    //     this._productListService.getProductList(inputParam).subscribe(
    //       (products: Product[]) => {
    //         this.products = products;
    //         console.log("filterd products",this.products)
    //       },
    //       error => console.log(error)
    //     );
    //   }
    // });
  }

  removePriceRange() {
    // Clear the price range filter
    this.pricerangefilterData = [];
    
    // Optional: Emit a value to inform other components/services about the filter removal
    // this.filterDataService.priceRangeDataSend(this.pricerangefilterData);
    console.log('Price range removed:', this.pricerangefilterData);
  }

  clearRatingFilter() {
    this.avgRatingFilterData = []; // Reset the filter data
    // this.filterDataService.sendAvgRating(this.avgRatingFilterData);
  }
  clearProductFilter(){
    this.productfilterData = [];
    
  }
  getAllProducts() {
    this.route.params.subscribe(params => {
      this.val = params['val'];
      this.catalog_id = 0;
      this.filterEnabled = "true";
      const inputParam1 = new FilterCriteria();
      inputParam1.catalogId = this.catalog_id;
      inputParam1.filterEnabled = this.filterEnabled;
      const inputParam = new FilterCriteriaObj();
      inputParam.filterCriteria = inputParam1;

      this._productListService.getProductList(inputParam).subscribe(
        (products: Product[]) => {

          this.products = products;
          console.log('products', this.products);


          // setTimeout(() => {
          //   this.loading = false
          // }, 500);
          this.totalLength = products.length;
          console.log("products list: ", this.products);

          console.log("products list length: ", this.products["products"].length);

        },
        error => console.log(error)
      );

    });
  }



  ngOnDestroy(): void {
    // Clean up the subscription
    if (this._subscription) {
      this._subscription.unsubscribe();
    }
  }
  filterProductsByCatalogId(catalogId: any): void {
    this.loading = true;  // Start loading
    const inputParam1 = new FilterCriteria();
    inputParam1.catalogId = catalogId;
    inputParam1.filterEnabled = this.filterEnabled;
    const inputParam = new FilterCriteriaObj();
    inputParam.filterCriteria = inputParam1;

    this._productListService.getProductList(inputParam).subscribe(
      (products: Product[]) => {
        this.products = products;
        this.totalLength = products.length;  // Set total length for pagination
        // this.loading = false; 
        console.log("products list: ", this.products);
        console.log("products list length: ", this.products["products"].length);
      },
      error => {
        console.log(error);
        this.loading = false;  // End loading in case of error
      }
    );
  }
   loadFavourites() {
    this.wishistService.getFavourites(parseInt(localStorage.getItem('userId'))).subscribe(data => {
      this.favourites = data;
    })
  }


  loadWishlist() {
    let productskus = [];
    this.wishistService.getWishlist(parseInt(localStorage.getItem('userId'))).subscribe(wishlistItems => {
      this.wishlist = wishlistItems;

      console.log(this.wishlist);

    })
  }
  updatePage(newPage: number) {
   
    // Navigate to the current route with the 'page' query parameter updated
    // this.router.navigate([], {
    //   relativeTo: this.route,
    //   queryParams: { page: newPage },
    //   queryParamsHandling: 'merge', // Preserve existing query parameters
    // });
    
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });

  }
}

