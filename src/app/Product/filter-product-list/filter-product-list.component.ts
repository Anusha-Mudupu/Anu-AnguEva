/*
 *   Copyright (c) 2023 Dmantz Technologies private limited
 *   All rights reserved.
 */
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DropdownNotifyService } from '../../sharedServices/dropdown-notify.service';
import { ActivatedRoute } from '@angular/router';
import { FilterProductService } from 'src/app/sharedServices/filter-product.service';
import { productCatalog } from 'src/app/data/hero';

@Component({
  selector: 'app-filter-product-list',
  templateUrl: './filter-product-list.component.html',
  styleUrls: ['./filter-product-list.component.css']
})
export class FilterProductListComponent implements OnInit {
  categoryidselected: any;

  private id;
  public filterProductRes: productCatalog[] = [];

  constructor(private route: ActivatedRoute, private filterProductService: FilterProductService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {

      this.id = +params['id'];
      console.log(this.id);
      this.filterProductService.getFilterProductList(this.id).subscribe(
        data => {
          console.log(data);
          this.filterProductRes = <any[]>data;
          console.log(this.filterProductRes);
         


        }
      );
    });
  }
}
