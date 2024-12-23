/*
 *   Copyright (c) 2023 Dmantz Technologies private limited
 *   All rights reserved.
 */
import { Component, OnInit, Input, } from '@angular/core';
import { Product } from 'src/app/data/hero';
import { FilterDataService } from 'src/app/sharedServices/filter-data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';

// import { Options, LabelType } from 'ng5-slider';


import { Options, LabelType } from '@angular-slider/ngx-slider';
import { ThemeService } from 'src/app/theme.service';

declare var $: any;
@Component({
  selector: 'app-refine-search',
  templateUrl: './refine-search.component.html',
  styleUrls: ['./refine-search.component.css'],
})
export class RefineSearchComponent implements OnInit {

  @Input() productListObj: any;
  public currentrecordbrand = [];
  public currentpricerange: number[] = [];
  public productList: Product[];
  public ownerDataSeparated: any[] = [];
  public brandDataSeparated: any[] = [];
  public ratingData: any;
  public priceRangeSelected = [];
  public currentAvgRating = []
  public currentProductName = [];
  loading: boolean = true;
  avgRatingFilterData: any;
  selectedRatings: number[] = [];
  selectedManufacturers: string[] = [];
  filter = {
    price: null,
    productManufacturerName: null,
    rating: []
  };
  filterViewDesktopVisible=true;
  filterViewVisible =false;
  priceRangeVisible = true;
  ratingVisible = true;
  productVisible = true;
 


  constructor(private router: Router, private activatedRoute: ActivatedRoute,
    public themeService: ThemeService,
    private filterDataService: FilterDataService,
    private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      // Set price range if present in query params
      if (params['price']) {
        const [min, max] = params['price'].split('-').map(Number);
        this.minValue = min;
        this.maxValue = max;
      }

      // Set ratings if present in query params
      if (params['rating']) {
        this.selectedRatings = params['rating'].split(',').map(Number);
      }

      // Set brand if present in query params
      if (params['productManufacturerName']) {
        this.brandDataSeparated = params['productManufacturerName'].split(',');
      }
    });

    setTimeout(() => {
      this.loading = false
    }, 1000);
    this.productList = this.productListObj["products"];
    console.log("product List:", this.productList);
    this.currentProductName = this.productList.map(p => p.productManufacturerName).filter((value, index, self) => {
      return self.indexOf(value) === index;
    });
    this.currentpricerange = this.productList.map(p => p.productSkus[0].price).filter((value, index, self) => {
      return self.indexOf(value) === index;
    });
    console.log("currentpricerange", this.currentpricerange);
    this.currentAvgRating = this.productList.map(p => p.productSkus[0].avgCustomerRating).filter((value, index, self) => {
      return self.indexOf(value) === index;
    });
    console.log("currentAvgRating", this.currentAvgRating);
  }

  minValue: number = Math.max.apply(Math, this.currentpricerange);
  maxValue: number = Math.min.apply(Math, this.currentpricerange);

  options: Options = {
    floor: 0,
    ceil: 10000,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:

          return '<span style="color:rosybrown;"><b>Rs.</b>' + value + '</span>'
        case LabelType.High:

          return '<span style="color:rosybrown;"><b>Rs.</b>' + value + '</span>'
        default:
          return '<span style="color:rosybrown;"><b>Rs.</b>' + value + '</span>'
      }
    }
  };


  brand() {
    if (document.getElementById("panel").style.display === 'none') {
      document.getElementById("panel").style.display = 'block';
    } else {
      document.getElementById("panel").style.display = 'none';
    }
  }
  getPriceRange($event, minValue, maxValue) {
    const queryParams = { price: `${minValue}-${maxValue}` };
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: queryParams,
      queryParamsHandling: 'merge'  // Merge the query parameters with the existing ones
    });

    console.log(minValue);
    console.log(maxValue);

    this.priceRangeSelected.push(this.minValue, this.maxValue,);
    console.log(this.priceRangeSelected.length);
    if (this.priceRangeSelected.length > 2) {
      this.priceRangeSelected = [];

      this.priceRangeSelected.push(this.minValue, this.maxValue,);
    }
    console.log("pricerangeselected", this.priceRangeSelected);
    this.filterDataService.priceRangeDataSend(this.priceRangeSelected);

  }

  // getBrandSelected(event: any, val: string): void {
  //   const queryParams = {productManufacturerName: `${val}` }
  //   console.log("queryParams",queryParams)
  // let productFilter = queryParams['productManufacturerName'] ? queryParams['productManufacturerName'].split(',') : [];
  //   if (event.target.checked) {
  //     if (!this.brandDataSeparated.includes(val)) {
  //       this.brandDataSeparated.push(val);
  //     }
  //   } else {
  //     this.brandDataSeparated.splice(this.brandDataSeparated.indexOf(val), 1);
  //   }

  //   // Update the filter object
  //   this.filter.productManufacturerName = this.brandDataSeparated.length > 0 ? this.brandDataSeparated.join(',') : null;
  //   console.log('Selected manufacturers:', this.brandDataSeparated);

  //   // Send the updated filter to the service
  //   this.filterDataService.sendDataToOtherComponent2(this.brandDataSeparated);
  //   this.router.navigate([], { 
  //     relativeTo: this.activatedRoute, 
  //     queryParams: { productManufacturerName: productFilter.join(',') }, 
  //     queryParamsHandling: 'merge' 
  //   });
  // }
  getBrandSelected(event: any, val: string): void {
    if (event.target.checked) {
      // Add the brand to the list if it's not already there
      if (!this.brandDataSeparated.includes(val)) {
        this.brandDataSeparated.push(val);
      }
    } else {
      // Remove the brand from the list
      this.brandDataSeparated = this.brandDataSeparated.filter(brand => brand !== val);
    }

    // Update query params with all selected brands
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: { productManufacturerName: this.brandDataSeparated.join(',') }, // Join selected brands
      queryParamsHandling: 'merge' // Merge new query params with existing ones
    });

    // Send the updated brand filter to your service (if needed)
    this.filterDataService.sendDataToOtherComponent2(this.brandDataSeparated);
  }
 
  clearAll(event: Event): void {
    // Clear the selected ratings
    this.priceRangeSelected = []
    this.selectedRatings = [];
    this.brandDataSeparated = []; // Assuming you want to clear brands as well
    this.minValue = this.options.floor;
    this.maxValue = this.options.ceil;
    // Clear the filter object
    this.filter = {
      price: null,
      productManufacturerName: null,
      rating: [],
     
    };

    // Update query params to remove all filters
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: {
        productManufacturerName: null,
        price: null,
        rating: null
      },
      queryParamsHandling: 'merge', 
      
      
    });

    // Clear data in the service
    this.filterDataService.sendDataToOtherComponent2([]);
    this.filterDataService.priceRangeDataSend([]);

    // Uncheck all checkboxes
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox: HTMLInputElement) => {
      checkbox.checked = false;
    });

    // Trigger change detection if necessary
    this.cdr.detectChanges();

    console.log('Filters cleared.');
    event.preventDefault(); // Prevent default link behavior
  
  }


  rating() {
    if (document.getElementById("panel2").style.display === 'none') {
      document.getElementById("panel2").style.display = 'block';
    } else {
      document.getElementById("panel2").style.display = 'none';
    }
  }
  // filterByRating(rating: number): void {
  //   console.log('Filter by rating:', rating);
  //   this.ratingData = rating;
  //   this.avgRatingFilterData = rating; // Update the filter data used in the pipe
  //   this.filterDataService.sendAvgRating(this.ratingData);
  // }

  // filterByRating(rating: number, isChecked: boolean): void {
  //   const queryParams = {rating: `${rating}-${isChecked}` }
  // let ratingFilter = queryParams['rating'] ? queryParams['rating'].split(',') : [];

  //   if (isChecked) {
  //     // Add rating to the list
  //     if (!this.selectedRatings.includes(rating)) {
  //       this.selectedRatings.push(rating);
  //     }
  //   } else {
  //     // Remove rating from the list
  //     this.selectedRatings = this.selectedRatings.filter(r => r !== rating);
  //   }
  //   console.log('Selected ratings:', this.selectedRatings);
  //   this.filterDataService.sendAvgRating(this.selectedRatings);
  //   this.router.navigate([], { 
  //     relativeTo: this.activatedRoute, 
  //     queryParams: { rating: ratingFilter.join(',') }, 
  //     queryParamsHandling: 'merge' 
  //   });
  // }
  filterByRating(rating: number, isChecked: boolean): void {
    if (isChecked) {
      if (!this.selectedRatings.includes(rating)) {
        this.selectedRatings.push(rating);
      }
    } else {
      this.selectedRatings = this.selectedRatings.filter(r => r !== rating);
    }
    
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: { rating: this.selectedRatings.join(',') },
      queryParamsHandling: 'merge',
      
    });

    this.filterDataService.sendAvgRating(this.selectedRatings);

  }

  pricerange() {
    if (document.getElementById("panel1").style.display === 'none') {
      document.getElementById("panel1").style.display = 'block';
    } else {
      document.getElementById("panel1").style.display = 'none';
    }
  }

  checkAll() {

    $(":checkbox").attr("checked", false);
    this.brandDataSeparated = [];
    this.filterDataService.sendDataToOtherComponent2(this.brandDataSeparated);


  }
  
}
