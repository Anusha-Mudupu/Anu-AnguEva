import { Component, OnInit } from '@angular/core';
import { Product, SearchTag, Vendor } from 'src/app/data/data-objects';
import { VendorDataService } from 'src/app/services/vendor-data.service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ProductDataService } from 'src/app/services/product-data.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.scss']
})
export class ProductDialogComponent implements OnInit {

  constructor(
    private vendorDataService: VendorDataService,
    private formBuilder: FormBuilder,
    private productDataService: ProductDataService,
    private dialogRef: MatDialogRef<ProductDialogComponent>,
  ) { }

  product!: Product;

  productForm: FormGroup
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  vendorData: any;
  addOnBlur = true;
  searchTags: string[] = [];
  public selectedId: number;
  selectedmanufactureId: any;
  selectedVendor: string

  ngOnInit() {
    this.vendorDataService.getVendors().subscribe((response) => {
      this.vendorData = response;

    })
    //   this.productForm = this.formBuilder.group({
    //     productName: ['', Validators.compose([Validators.required])],
    //     manufacturerName: ['', Validators.compose([Validators.required])],
    //    productDesc: ['',Validators.compose([Validators.required])],
    //    search_tags: ['', Validators.compose([Validators.required])],
    //  manufacturerId:'',
    //     storeId: [1]
    //   })

    //this.onselected(this.selectedmanufactureId)
    this.productForm = new FormGroup({
      productName: new FormControl(''),
      productDesc: new FormControl(''),
      searchTag: new FormControl(''),
      manufacturerId: new FormControl(''),
      storeId: new FormControl('1'
      )
    })
  }
 

  addTag(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add Search Tag
    if (value) {
      this.searchTags.push(value);
    }
    // Clear the input value
    event.chipInput!.clear();
  }

  removeTag(searchTag: string): void {
    const index = this.searchTags.indexOf(searchTag);

    if (index >= 0) {
      this.searchTags.splice(index, 1);
    }
  }

  // AddProduct(productForm:any){

  //   this.productForm.controls['search_tags'].setValue(this.searchTags.toString());
  //    console.log(this.productForm.value);

  //   if(this.productForm.valid){
  //   this.productDataService.addProduct(this.productForm.value)
  //   .subscribe({
  //     next:(res) => {
  //       alert("Product Added Successfully");
  //       this.productForm.reset();
  //       this.dialogRef.close();
  //       console.log(res);
  //     },
  //     error:(error) => {
  //       alert("Something's wrong please check Console");
  //       console.log(error)
  //     }
  //   })
  //   }
  //   this.searchTags = [];
  // }




  addProduct(productForm: any) {
    this.productForm.controls['searchTag'].setValue(this.searchTags.toString());
    console.log(this.productForm.value);
    this.productDataService.addProduct(this.productForm.value).subscribe(res => {
      console.log(res);
      alert('Product Added Successfully');
    });
    this.searchTags = []
  }
}
