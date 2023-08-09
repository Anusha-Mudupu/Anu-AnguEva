/*
 *   Copyright (c) 2023 Dmantz Technologies Pvt ltd
 *   All rights reserved.
 */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductSkuDataService } from '../services/productsku-data.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
// import { ProductSkuOptions } from '../data/data-objects';
@Component({
  selector: 'app-product-sku-options',
  templateUrl: './product-sku-options.component.html',
  styleUrls: ['./product-sku-options.component.scss']
})
export class ProductSkuOptionsComponent implements OnInit {
  id: any;
  OptionsData: any
  selectedOptionName: any
constructor(private router: Router, private activateroute: ActivatedRoute, private productSkuDataservice: ProductSkuDataService) { }
    OptionsForm = new FormGroup({
    OptionName: new FormControl('', Validators.required),
  });


  ngOnInit(): void {
    // this.id = this.activateroute.snapshot.params['productSkuId'];

    // this.productSkuDataservice.getOptionsBySkuId(this.id).subscribe((data: any) => {
    //   this.OptionsData = data;
    //   console.log(this.OptionsData);
    // })
  }
  // onselected(event: any) {
  //   console.log(event.target.value);
  //   console.log(this.selectedOptionName)
  // }

  // addOptions() {
  //   this.router.navigate(['/admin/add-options',this.id])
  // }

}
