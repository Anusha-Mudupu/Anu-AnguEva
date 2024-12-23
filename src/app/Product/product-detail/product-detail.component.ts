/*
 *   Copyright (c) 2023 Dmantz Technologies private limited
 *   All rights reserved.
 */
import { Component, OnInit } from '@angular/core';
import { ProductDetailService } from '../../sharedServices/product-detail.service';
import { Input, Output } from '@angular/core';
import { Product, Skus, FilterCriteria, FilterCriteriaObj, Options, productsku } from '../../data/hero';
import { Router, NavigationExtras } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ProductListService } from '../../Product/product-list/productListService';
import { } from 'rxjs';
import { DropdownNotifyService } from '../../sharedServices/dropdown-notify.service';
import { EventEmitter } from 'events';
import { AppService } from 'src/app/sharedServices/app.service';
import { ThemeService } from 'src/app/theme.service';


@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  _subscription: any;
  @Input() currentTileProduct: Product;
  private id;
  private sku = 2;
  private productListService;
  private catalog_id = 0;
  private filterEnabled = "sajana";
  private ProductsList: Product;
  public currentproductdetails;
  private optionsarray: Options[] = [];
  public optionnamesarraylist = [];
  public optionvaluesarraylist = [];
  private mergednamearray = [];
  private mergedvaluearray = [];
  public resultnamearray = [];
  public resultvaluearray = [];
  public currentClickedProduct;
  public map = new Map();
  public productskuSelected;
  productskuImgUrls: any[];
  private sku_id;
  storeVariables = new Array();

  constructor(private _productListService: ProductListService, private route: ActivatedRoute, private _dropdownNotifyService: DropdownNotifyService, private productDetailService: ProductDetailService,
    private _appService: AppService,
    public themeService: ThemeService) {
    this.route.paramMap.subscribe(params => {
      this.ngOnInit();
    });
  }

  ngOnInit() {

    this._appService.setShowBanner(true);

    // entered into ngOnInit() of product-detail.component.ts file.;
    
    console.log("current product id is. ", this.route.snapshot.params['product']);
    this.sku_id = this.route.snapshot.params['skuId'];
    console.log("current skuid is. ", this.sku_id);

    this.id = this.route.snapshot.params['product'];
    console.log("this.route.snapshot.params[product] is. ", this.id);
    const inputParam1 = new FilterCriteria();
    inputParam1.catalogId = this.id;
    inputParam1.filterEnabled = "product";
    const inputParam = new FilterCriteriaObj();
    inputParam.filterCriteria = inputParam1;
    console.log("this is inputParam of type FilterCriteriaObj. ", inputParam);
    this.productDetailService.getProductsById(inputParam, this.sku_id).subscribe((currentProductDetail: Product) => {
      console.log("this is currentProductDetails. ", currentProductDetail);
      this.currentproductdetails = currentProductDetail;
      console.log("current product Deatils are. ", this.currentproductdetails);
      console.log("this is typeOf(this.currentproductdetails). ", typeof (this.currentproductdetails));
      this.ProductsList = this.currentproductdetails.products;
     
      this.currentClickedProduct = this.ProductsList[0];


      console.log("currentClickedProduct: ", this.currentClickedProduct);

      this.productskuSelected = this.currentClickedProduct.productSkus.filter(sku => sku.productSkuId == this.sku_id)
      console.log(" Selected productSkus in current product: ", this.productskuSelected[0]);

      var i, j, flags = [], len = this.currentClickedProduct.productSkus.length, outputoptionnames = [], outputoptionvalues = [];
      console.log("skus length: ", this.ProductsList[0].productSkus.length, len);
      for (j = 0; j < len; j++) {
        var l = this.currentClickedProduct.productSkus[j].options.length;    //not getting 
        console.log("lllll", l);
        for (i = 0; i < l; i++) {

          //Checks if an option with the same optionName has already been encountered (avoiding duplicates):
          if (flags[this.currentClickedProduct.productSkus[j].options[i].optionName]) continue;


          //flags is likely an object used to keep track of encountered option names.
          flags[this.currentClickedProduct.productSkus[j].options[i].optionName] = true;
          if (flags[this.currentClickedProduct.productSkus[j].options[i].optionValue]) continue;
          flags[this.currentClickedProduct.productSkus[j].options[i].optionValue] = true;
          outputoptionnames.push(this.currentClickedProduct.productSkus[j].options[i].optionName);
          outputoptionvalues.push(this.currentClickedProduct.productSkus[j].options[i].optionValue);
        }
        console.log(outputoptionnames);
        this.optionnamesarraylist.push(outputoptionnames);
        this.optionvaluesarraylist.push(outputoptionvalues);
        //merging of individual arrays
        this.mergednamearray = [].concat.apply([], this.optionnamesarraylist);
        this.mergedvaluearray = [].concat.apply([], this.optionvaluesarraylist); //[color,type]
        this.resultvaluearray = Array.from(new Set(this.mergedvaluearray));
        this.resultnamearray = Array.from(new Set(this.mergednamearray));
      }
      console.log("this.resultvaluearray",this.resultvaluearray);
      console.log(this.resultnamearray);
      let optvalue = [];
      var optionval;
      for (let optionNm of this.resultnamearray) {
        console.log("optionNm",optionNm);
        optvalue = [];

        //this loop for no of productskus
        for (i = 0; i < len; i++) {

          console.log(i);
          console.log("this.currentClickedProduct", this.currentClickedProduct);
          var l = this.currentClickedProduct.productSkus[i].options.length;
          //this loop for no of options for perticular sku
          for (j = 0; j < l; j++) {

            console.log(j);

            console.log("xyzf",this.currentClickedProduct.productSkus[i].options[j]); 
            //optionName,optionValue
            if (optionNm == this.currentClickedProduct.productSkus[i].options[j].optionName) {
              console.log("optionNm",optionNm);
              optionval = this.currentClickedProduct.productSkus[i].options[j].optionValue;
              console.log("optionval",optionval);
              console.log("optvalue",optvalue);

              if (!optvalue.includes(optionval)) {
                optvalue.push(optionval);
              }
            }
          }
          this.map.set(optionNm, optvalue);
        }
        console.log(this.map);
      }
      console.log("this.map",this.map);



    });
    console.log(" Selected productSkus in current product outside of subscribe(). ", this.productskuSelected);
  }
  OnClicked() {
    console.log(this.currentproductdetails);
  }

}
