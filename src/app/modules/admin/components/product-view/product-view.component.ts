import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faArrowLeft, faEdit, faSave } from '@fortawesome/free-solid-svg-icons';
import { Product, ProductSku } from 'src/app/data/data-objects';
import { ProductDataService } from 'src/app/services/product-data.service';
import { ProductSkuDataService } from 'src/app/services/productsku-data.service';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss']
})
export class ProductViewComponent implements OnInit {
  productData!: Product;
  id: any;
  skuData: ProductSku[] = [];
  faArrowLeft = faArrowLeft;
  faSave = faSave;
  faEdit = faEdit;

  constructor(
    private route: ActivatedRoute, 
    private productDataService: ProductDataService,
    private productSkuDataService: ProductSkuDataService
    ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('productId');
    this.productDataService.getProductById(this.id).subscribe(
      (response) =>{ 
      this.productData = response;
      console.log(this.productData);
    })

      this.productSkuDataService.getAllProductSkus(this.id).subscribe(
        (data) => {
        this.skuData = data;
        console.log(this.skuData);
      })
    }
  }