import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Catalog, Product, SearchTag, Vendor } from 'src/app/data/data-objects';
import { VendorDataService } from 'src/app/services/vendor-data.service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { ProductDataService } from 'src/app/services/product-data.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { Observable, filter, map, startWith } from 'rxjs';
import { AddNewCatalogComponent } from '../add-new-catalog/add-new-catalog.component';

@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.scss']
})
export class ProductDialogComponent implements OnInit {
 

constructor(
    private vendorDataService: VendorDataService,
    private productDataService: ProductDataService,
    private dialogRef: MatDialogRef<ProductDialogComponent>,
    private fb:FormBuilder,
    private dailog:MatDialog
  ) { }


  product!: Product;
  //selectedCatalogs: Catalog[];
  productForm: any
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  vendorData: any;
  addOnBlur = true;
  searchTags: string[] = [];
  public selectedId: number;
  selectedmanufactureId: any;
  selectedCatalogVals: any;
  selectedVendor: string;
  Catalogsdata:any
  searchText:any;
  selectedcatalogid:any
  //  index:any=0;
  filteredOptions: string[] = [];
  ngOnInit() {
    this.vendorDataService.getVendors().subscribe((response) => {
      this.vendorData = response; 
    })
    this.vendorDataService.getAllCatalogs().subscribe((data:any)=>{
      this.Catalogsdata=data;
      // this.selectedCatalogVals = data;
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
      catalog: new FormArray([])
      // catalog: this.fb.array([
      //  this.onSelectCatalogs()
      // ]),
      })
  }


  get catalog(): FormArray {
    console.log('get selectedCatalogs called');
    return this.productForm.get('catalog') as FormArray;
  }


  // Catalog(): FormGroup {
  //   return this.fb.group({
  //     catalogId: new FormControl(''),
  //      primaryFlg:new FormControl('Y'),
  //      productId:new FormControl(''),
  //      productCatalogId:new FormControl(''),
       
  //   });
  // }

  onSelectCatalogs(){
    console.log("onSelectCatalogs Called",this.selectedCatalogVals);
    // this.selectedcatalogid=this.selectedCatalogVals[this.index].catalogId;
  //   this.selectedcatalogid = this.selectedCatalogVals.find((id:any) => id.catalogId=== this.selectedCatalogVals.catalogId);
  //  this.selectedId = this.selectedcatalogid ? this.selectedcatalogid.catalogId : null;
    
   
    //Loops through this.selectedCatalogVals and push each value.
    for(let i=0;i<this.selectedCatalogVals.length;i++){
      this.selectedcatalogid=this.selectedCatalogVals[i].catalogId;
      console.log('selectedcatalogid',this.selectedcatalogid);
    }
          //  this.selectedCatalogs.clear();
    this.catalog.push(this.fb.group({
      catalogId: this.selectedcatalogid,
      primaryFlg:new FormControl('Y'), 
      productCatalogId:new FormControl()
      }));
//TODO create new form group and push to selectedCatalogs
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
  addNewCatalog(){
    const dialogRef =this.dailog.open( AddNewCatalogComponent,{ })
   }
   filterOptions(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredOptions = this.Catalogsdata.filter((option:any) => option.toLowerCase().includes(filterValue));
  }

}
 







