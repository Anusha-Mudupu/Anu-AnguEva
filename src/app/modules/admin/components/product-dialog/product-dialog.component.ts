import { Component, OnInit } from '@angular/core';
import { Catalog, Product, SearchTag, Vendor } from 'src/app/data/data-objects';
import { VendorDataService } from 'src/app/services/vendor-data.service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { ProductDataService } from 'src/app/services/product-data.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { filter } from 'rxjs';
import { AddNewCatalogComponent } from '../add-new-catalog/add-new-catalog.component';

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
    private fb:FormBuilder,
    private dailog:MatDialog
  ) { 

  }


  product!: Product;
  selectedCatalogs: Catalog[];
  productForm: any
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  vendorData: any;
  addOnBlur = true;
  searchTags: string[] = [];
  public selectedId: number;
  selectedmanufactureId: any;
  selectedVendor: string;
  Catalogsdata:any
  searchText:any;

  ngOnInit() {
    this.vendorDataService.getVendors().subscribe((response) => {
      this.vendorData = response;

    })
    this.vendorDataService.getAllCatalogs().subscribe((data:any)=>{
      this.Catalogsdata=data;
      console.log(data);
      
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
      storeId: new FormControl('1'),
      selectedCatalogs: this.fb.array([
        this.Catalog()
      ]),
    })
  }

  Catalog(): FormGroup {
    return this.fb.group({
      catalogId: new FormControl(''),
       primaryFlg:new FormControl('Y'),
       productId:new FormControl(''),
       productCatalogId:new FormControl(''),
       
    });
  }


  addAddress() {
    const addresses = this.productForm.get('selectedCatalogs') as FormArray;
    addresses.push(this.Catalog());
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
    // this.productForm.push(this.Catalog);
  }

onSelectedGstCode(event:any){
    this.selectedmanufactureId=event.target.value;
    console.log(this.selectedmanufactureId)
   }

   addNewCatalog(){
    const dialogRef =this.dailog.open( AddNewCatalogComponent,{ })
   }



 







}
