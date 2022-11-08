import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-sku-detail',
  templateUrl: './product-sku-detail.component.html',
  styleUrls: ['./product-sku-detail.component.scss']
})
export class ProductSkuDetailComponent implements OnInit {

  id:any;
  constructor(private router:Router, private route: ActivatedRoute) { }

  onSelect()
  {
    this.router.navigate(["/admin/product-sku-detail",this.id]);

  }

  ngOnInit(): void {

    this.id=this.route.snapshot.paramMap.get('productSkuId');
  }

  

}
