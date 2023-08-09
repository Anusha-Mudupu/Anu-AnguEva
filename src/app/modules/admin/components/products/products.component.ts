/*
 *   Copyright (c) 2023 Dmantz Technologies Pvt ltd
 *   All rights reserved.
 */
import {Component, OnInit} from '@angular/core';
import { Product } from 'src/app/data/data-objects';
import { ProductDataService } from 'src/app/services/product-data.service';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import { ProductDialogComponent } from '../product-dialog/product-dialog.component';

import { Router } from '@angular/router';
import { UpdateProductComponent } from '../update-product/update-product.component';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit{
  data: Product[] = [];
  selection = new SelectionModel<Product>(true, []);
  dataSource: any;
  constructor(private productDataService: ProductDataService, private dialog: MatDialog, private router: Router) { }

  ngOnInit() {
    this.productDataService.getProducts().subscribe((response) =>{ 
      this.data = response;
   
      console.log(this.data);
       this.dataSource = new MatTableDataSource(this.data);
    })
   }

   isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
   }

   masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach((row: Product) => this.selection.select(row));
  }

  openDialog(){
    // console.log('open dialog clicked')
    const dialogRef = this.dialog.open(ProductDialogComponent, {width: '60%', height: 'auto',disableClose: true})
    .afterClosed().subscribe(result=>{this.ngOnInit()});
  }
  openUpdateProduct(productId:any){
    const dialogRef =this.dialog.open( UpdateProductComponent,{
      data: { productId:productId}
    }).afterClosed().subscribe(result=>{this.ngOnInit()});
  }

  GotoProduct(productId: number){
    this.router.navigate(["/admin/products",productId])
  }
displayedColumns: string[] = ['select','position','productName', 'productDesc','manufacturerName','actions'];



applyFilter(event: any) {
  let filterValue = event.target.value; // Remove whitespace
  filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
  this.dataSource.filter = filterValue;
}

  }
