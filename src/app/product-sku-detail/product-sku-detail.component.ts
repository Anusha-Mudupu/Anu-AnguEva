/*
 *   Copyright (c) 2023 Dmantz Technologies Pvt ltd
 *   All rights reserved.
 */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductSkuServiceService } from '../product-sku-service.service';
import { ProductSkuDataService } from '../services/productsku-data.service';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { SelectGstComponent } from '../select-gst/select-gst.component';
import { AddNewOptionComponent } from '../modules/admin/components/add-new-option/add-new-option.component';


@Component({
  selector: 'app-product-sku-detail',
  templateUrl: './product-sku-detail.component.html',
  styleUrls: ['./product-sku-detail.component.scss']
})
export class ProductSkuDetailComponent implements OnInit {
  // productSku: ProductSku = new ProductSku()
  productSku: any
  id: any;
  isDisabled: boolean = true;
  selectedFile: File;
  imageBaseUrl: any;
  image: any;
  myfiles: any = [];
  isPrimary: boolean = true;
  isEditMode = true;
  OptionsData: any[] = [];

  Gstcode: any
  GstTypes: any;
  Gstpercentage: any
  productSkudetails: any
  alloptionsData: any[] = [];

  filteredOptions: any[] = [];
  Updateform: any;
  currentOptionName: any;
  currentOptionValue: any;
  selectedOptionValue: any;
  selectedOptionName: any;
  abc1: any;
  optionsDetails: any;
  currentOptionValueId: any;



  constructor(private domSanitizer: DomSanitizer, private httpClient: HttpClient, private router: Router, private route: ActivatedRoute, private productskuservice: ProductSkuServiceService, private productSkuDataservice: ProductSkuDataService, private dialog: MatDialog, private fb: FormBuilder) {
    this.Updateform = this.fb.group({
      productSkuId: new FormControl('', Validators.compose([Validators.required])),
      price: new FormControl('', Validators.compose([Validators.required])),
      productSkuCd: new FormControl('', Validators.compose([Validators.required])),
      count: new FormControl('', Validators.compose([Validators.required])),
      Discount: new FormControl('', Validators.compose([Validators.required])),
      barcode: new FormControl('', Validators.compose([Validators.required])),
      Description: new FormControl('', Validators.compose([Validators.required])),
      productId: new FormControl('', Validators.compose([Validators.required])),
      status: new FormControl('', Validators.compose([Validators.required])),
      profile: new FormControl('', Validators.compose([Validators.required])),
      selfLocCd: new FormControl('', Validators.compose([Validators.required])),
      option: new FormArray([])

    })
  }

  ngOnInit(): void {

    this.edit()
    this.imageBaseUrl = environment.imagesBaseUrl
    this.id = this.route.snapshot.params['productSkuId']
    console.log(this.id)
    this.productSkuDataservice.getProductSkuByID(this.id).subscribe(
      (response) => {
        console.log(response);
        console.log(this.productSku);
        this.productSku = response;
        this.image = this.productSku.image;
        this.OptionsData = this.productSku.option;

        console.log(this.Gstcode)
        console.log(this.image)
        console.log(this.productSku);
        console.log(this.OptionsData)
        //this.imageBaseUrl= environment.imagesBaseUrl + this.productSku.productSkuImage;
        this.optionsDetails = this.OptionsData.map((item: any) => {
          return this.option.push(this.fb.group({
            optionId: item.optionId,
            productSkuOptionsId: new FormControl()
          }));
        });
      });

    this.productSkuDataservice.getAllOptions().subscribe((data: any) => {
      this.alloptionsData = data;
     
     
    });
   


  }

  get option(): FormArray {
    console.log('get selectedOptions called');
    return this.Updateform.get('option') as FormArray;
  }

  filterOptions(i: any) {
    if (this.selectedOptionName) {
      this.filteredOptions = this.alloptionsData.filter((option: any) => option.optionName === this.selectedOptionName);
      console.log('filteredoptiondata', this.filteredOptions);
      this.currentOptionName = this.filteredOptions[i].optionName;
    }
  }
 
  currentSelectedOptionValue(i:any) {
    console.log('selectedoptionvalues', this.selectedOptionValue)
     this.currentOptionValueId=this.filteredOptions[i].optionId;

      this.option.push(this.fb.group({
        optionId: this.selectedOptionValue,
       }));
     
      console.log('form', this.Updateform.value);
  }










  saveUpdateProductSku() {
    this.productSkuDataservice.upDateProductSkuById(this.id, this.Updateform.value).subscribe(data => {
      console.log(data);
      alert('successfully updated');
    }, errormsg => {
      alert('Something Went wrong');
    }
    );
    console.log(this.Updateform.value)
  }

  onSubmit() {
    console.log(this.Updateform.value);
    if (this.productSku.status === true) {
      this.productSku.status = 'Available'
    }
    else
      if (this.productSku.status === false) {
        this.productSku.status = 'Not-Available'
      }
    this.saveUpdateProductSku();
    window.location.reload();
    // this.saveUploadImage();
    //  this.router.navigate(['/admin/products/:productId',this.productSku]);

    const formData = new FormData();
    // for(let i=0;i<this.selectedFile.length;i++){
    formData.append('file', this.selectedFile);
    // }
    this.httpClient.post('http://localhost:8085/api/file/upload/' + this.id, formData).subscribe(
      response => console.log('image_added', response),

      error => console.error(error)
    );

  }


  cancel() {
    this.router.navigate(['/admin/products/:productId', this.productSku])
    alert('Youre Changes are not saved Do you Want to Cancel It ');
  }
  onFileSelected(event: any) {
    // for(let i=0;i<(event.target.files.length);i++){
    this.selectedFile = <File>event.target.files[0];
    //   this.myfiles.push(event.target.files[i]);
    //   this.Updateform.get('profile')?.setValue(this.myfiles)
    // }
  }


  deleteimage(productSkuImageId: number) {
    this.productSkuDataservice.deleteImgByImgId(productSkuImageId).subscribe(data => {
      console.log(data);

    }, message => {
      alert('Do you want to delete it');
    }
    )
    window.location.reload();
    this.ngOnInit()
  }


  edit() {
    this.isEditMode = !this.isEditMode
    if (this.isEditMode == true) {
      this.Updateform.enable();
    }
    else
      if (this.isEditMode == false) {
        this.Updateform.disable();

      }
  }

  AddOptions() {
    // this.router.navigate(['/admin/addnewoption',this.id])

    const dialogRef = this.dialog.open(AddNewOptionComponent, {})

  }

  addNewGst() {
    this.router.navigate(['/admin/add-new-gst'])
  }


  openModal(): void {
    this.dialog.open(SelectGstComponent, this.id);
  }

  button() {
    this.router.navigate(['/admin/select-gst', this.id])
  }



}






