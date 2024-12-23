/*
 *   Copyright (c) 2023 Dmantz Technologies private limited
 *   All rights reserved.
 */
import { Pipe, PipeTransform } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Pipe({
  name: 'contentfilter',
  pure: false
})
export class ContentfilterPipe implements PipeTransform {
  filterpricerange = [];
  itemspriceranges = [];
  public price;
  priceArray = new Array();
  productskus = [];
  productskus1 = [];
  filterproduts = [];
  constructor(private route: ActivatedRoute) { }
  // transform(items: any[], filter: any): any[] {
  //   console.log("filter",filter)
  //   if (!items) return [];
  //   if (!filter) return items;

  //   return items.filter(it => {
  //     console.log("filter.price",filter.price)
  //     console.log("productSkus",it.productSkus)
  //     // Filter by price range
  //     if (filter.price) {
  //       const priceFilteredProductSkus = it.productSkus.filter(sku => sku.price >= filter.price[0] && sku.price <= filter.price[1]);
  //       console.log("priceFilteredProductSkus",priceFilteredProductSkus)
  //       if (priceFilteredProductSkus.length === 0) {
  //         return false;
  //       }
  //       else{
  //         it.productSkus = priceFilteredProductSkus
  //       }
  //     }

  //     // Filter by product manufacturer name
  //     if (filter.productManufacturerName) {
  //       console.log("filter.productManufacturerName",filter.productManufacturerName)
  //       const filterDataCategory = filter.productManufacturerName.toString();
  //       console.log("filterDataCategory",filterDataCategory)
  //       const itDataCategory = it.productManufacturerName ? it.productManufacturerName.toString() : '';
  //       console.log("itDataCategory",itDataCategory)
  //       const xarray = filterDataCategory.split(',');
  //       const yarray = itDataCategory.split(",").map(item => item.trim());

  //       if (!xarray.some(a => yarray.includes(a))) {
  //         return false;
  //       }

  //     }


  //     // filter by rating 
  //     if (filter.rating && filter.rating.length > 0) {
  //       console.log("filter.rating", filter.rating);

  //       // Convert filter.rating values to numbers
  //       const ratingSet = new Set(filter.rating.map(Number));
  //       console.log("ratingSet", ratingSet);
  //       // Filter productSkus based on rounded avgCustomerRating
  //       const ratingFilteredProductSkus = it.productSkus.filter(sku => 
  //         ratingSet.has(Math.floor(sku.avgCustomerRating))
  //       );

  //       console.log("ratingFilteredProductSkus", ratingFilteredProductSkus);

  //       if (ratingFilteredProductSkus.length === 0) {
  //         // If no products match the rating filter, return false or handle as needed
  //         return false;
  //       } else {
  //         // Update the productSkus with the filtered SKUs
  //         it.productSkus = ratingFilteredProductSkus;
  //       }
  //     } else {
  //       // If filter.rating is empty or not provided, show all productSkus
  //       console.log("No rating filter applied. Showing all productSkus.");
  //       it.productSkus = it.productSkus; // This is redundant but makes it clear that all productSkus are shown
  //     }
  //     return true;
  //   });
  // }
  transform(items: any[], filter: any): any[] {
    const queryParams = this.route.snapshot.queryParams;

    // Use queryParams to apply filters
    const priceRange = queryParams['price'] ? queryParams['price'].split('-').map(Number) : null;
    const rating = queryParams['rating'] ? queryParams['rating'].split(',').map(Number) : null;
    const manufacturers = queryParams['productManufacturerName'] ? queryParams['productManufacturerName'].split(',') : null;
    if (!items || !filter) return items;

    return items.filter(it => {
      // Filter by price range
      if (filter.price) {
        const [minPrice, maxPrice] = filter.price;
        const priceFilteredProductSkus = it.productSkus.filter(sku => sku.price >= minPrice && sku.price <= maxPrice);
        if (priceFilteredProductSkus.length === 0) {
          return false;
        }
        it.productSkus = priceFilteredProductSkus;
      }
      // if (filter.price && filter.price.length === 2) {
      //   const [minPrice, maxPrice] = filter.price;
      //   const priceFilteredProductSkus = it.productSkus.filter(sku => sku.price >= minPrice && sku.price <= maxPrice);
      //   if (priceFilteredProductSkus.length === 0) {
      //     return false; // Exclude the item if no SKUs match the price range
      //   }
      //   it.productSkus = priceFilteredProductSkus; // Retain only the SKUs that match
      // }

      // Filter by product manufacturer name
      if (filter.productManufacturerName && filter.productManufacturerName.length > 0) {
        const filterManufacturers = filter.productManufacturerName.map(name => name.toString().trim());
        const itemManufacturers = it.productManufacturerName ? it.productManufacturerName.split(',').map(name => name.trim()) : [];
        if (!filterManufacturers.some(name => itemManufacturers.includes(name))) {
          return false;
        }
      }

      // Filter by rating
      if (filter.rating && filter.rating.length > 0) {
        const ratingSet = new Set(filter.rating.map(Number));
        const ratingFilteredProductSkus = it.productSkus.filter(sku => ratingSet.has(Math.floor(sku.avgCustomerRating)));
        if (ratingFilteredProductSkus.length === 0) {
          return false;
        }
        it.productSkus = ratingFilteredProductSkus;
      } else {
        // If no rating filter is applied, retain all productSkus
        it.productSkus = it.productSkus;
      }

      return true;
    });
  }
}