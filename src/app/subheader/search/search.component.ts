/*
 *   Copyright (c) 2023 Dmantz Technologies private limited
 *   All rights reserved.
 */
import { Component, OnInit, Input } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { ElasticsearchService } from '../../sharedServices/elastic-serch.service';
import { Product, CustomerSource, ProductIndex } from '../../data/hero';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  private static readonly INDEX = 'products';
  private static readonly TYPE = '_doc';
  productindex: ProductIndex;
  productsku: Product;
  noproducts = false;
  private queryText = '';
  private lastKeypress = 0;
  public listFilter;
  public resultSearch: ProductIndex;
  private id;
  private searchlink;
  constructor(private router: Router, private es: ElasticsearchService, private route: ActivatedRoute) {
    this.queryText = '';
  }

  ngOnInit() {
    
    // this.listFilter=this.route.snapshot.params['productName'];
    
    // this.route.params.subscribe(params => {
    //   // this.listFilter = +params['id'];
    //   console.log('this.listFilter', this.listFilter);
    //   this.es.fullTextSearch(
    //     SearchComponent.INDEX,
    //     SearchComponent.TYPE,

    //     'product_sku_id', this.listFilter)
    //     .then(
    //       response => {
    //         console.log("response of es", response);
    //         this.resultSearch = response[0].hits.hits.filter(x => x._source);
    //         console.log("resultsearch", this.resultSearch);
    //       }, error => {
    //         console.error(error);
    //       }).then(() => {
    //         console.log('search.component.ts Search Completed!');

    //       });

    // });
    this.route.params.subscribe(params => {
   
      this.listFilter = params['searchTag'];
      console.log('this.listFilter', this.listFilter);
    
      // Perform the Elasticsearch search
      this.es.fullTextSearch(SearchComponent.INDEX, SearchComponent.TYPE, 'product_sku_id', this.listFilter)
        .then(
          response => {
            console.log("response of es", response);
    
            if (response.hits && response.hits.hits) {
              // Filter and process the search results
              this.resultSearch = response.hits.hits.filter(x => x._source);
              console.log("resultsearch", this.resultSearch);
            } else {
              console.log("No search results or unexpected response format");
            }
          },
          error => {
            console.error("Error during Elasticsearch search:", error);
          })
        .then(() => {
          console.log('search.component.ts Search Completed!');
          
        });
    });
    

  }
  // getproductDetails() {
  //   this.es.getProducts().subscribe(products => {
  //     this.productindex = products;
  //     console.log("productindex", this.productindex)
  //   },
  //     error => console.log(error)
  //   );

  // }
  // search($event) {
  //   if ($event.timeStamp - this.lastKeypress > 100) {
  //     this.queryText = $event.target.value;
  //     this.es.fullTextSearch(
  //       SearchComponent.INDEX,
  //       SearchComponent.TYPE,

  //       'product_sku_id', this.listFilter)
  //       .then(
  //         response => {
  //           console.log("response of es", response);
  //           this.resultSearch = response.hits.hits.filter(x => x._source);
  //           console.log("resultsearch", this.resultSearch);
  //           console.log("this is resultSearch", this.resultSearch[0]._source.price);
  //         }, error => {
  //           console.error(error);
  //         }).then(() => {
  //           console.log('search.component.ts Search Completed!');

  //         });
  //   }
  //   this.lastKeypress = $event.timeStamp;
  // }


}