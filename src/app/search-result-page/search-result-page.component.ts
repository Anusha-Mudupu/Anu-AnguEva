/*
 *   Copyright (c) 2023 Dmantz Technologies private limited
 *   All rights reserved.
 */
import { Component, OnInit, Input } from '@angular/core';
import { ElasticsearchService } from 'src/app/sharedServices/elastic-serch.service';
import { productsku, ProductIndex } from '../data/hero';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-result-page',
  templateUrl: './search-result-page.component.html',
  styleUrls: ['./search-result-page.component.css']
})
export class SearchResultPageComponent implements OnInit {
  @Input() resultSearch: ProductIndex;
  private static readonly INDEX = 'products_index';
  private static readonly TYPE = 'product';
  productsku: productsku;
  private queryText = '';
  private lastKeypress = 0;

  constructor(private es: ElasticsearchService, private router: Router) {
    this.queryText = '';
  }

  ngOnInit() {

  }
  getDetails(sku_id) {
    console.log(sku_id);
    
    this.router.navigate(['/main/header/subheader/productDetail', sku_id]);

  }

}