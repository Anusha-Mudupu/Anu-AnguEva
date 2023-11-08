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

  Updateform: any;
  loading: boolean = false;
  productId: any;
  status:any;
  constructor(private domSanitizer: DomSanitizer, private httpClient: HttpClient, private router: Router, private route: ActivatedRoute, private productskuservice: ProductSkuServiceService, private productSkuDataservice: ProductSkuDataService, private dialog: MatDialog, private fb: FormBuilder) {
    this.Updateform = this.fb.group({
      productSkuId: new FormControl('', Validators.compose([Validators.required])),
      price: new FormControl('', Validators.compose([Validators.required])),
      productSkuCd: new FormControl('', Validators.compose([Validators.required])),
      count: new FormControl('', Validators.compose([Validators.required])),
      discount: new FormControl('', Validators.compose([Validators.required])),
      barCode: new FormControl('', Validators.compose([Validators.required])),
      skuDescription: new FormControl('', Validators.compose([Validators.required])),
      productId: new FormControl('', Validators.compose([Validators.required])),
      status: new FormControl('', Validators.compose([Validators.required])),
      profile: new FormControl('', Validators.compose([Validators.required])),
      selfLocCd: new FormControl('', Validators.compose([Validators.required])),
      gstId: new FormControl(''),
    })
  }

  ngOnInit(): void {

    this.edit()
    this.imageBaseUrl = environment.imagesBaseUrl
    this.id = this.route.snapshot.params['productSkuId'];
    this.productId = this.route.snapshot.params['productId']
    console.log(this.id)
    this.productSkuDataservice.getProductSkuByID(this.id).subscribe(
      (response) => {
        console.log(response);
        console.log(this.productSku);
        this.productSku = response;
        this.productId = this.productSku.productId;
        console.log('productId', this.productId)
        this.image = this.productSku.image;
        this.OptionsData = this.productSku.option;
        this.status=this.productSku.status;
        console.log('status', this.status);
        console.log(this.Gstcode)
        console.log(this.image)
        console.log(this.productSku);
        console.log(this.OptionsData)
        //this.imageBaseUrl= environment.imagesBaseUrl + this.productSku.productSkuImage;


        // this.optionsDetails = this.OptionsData.map((item: any) => {
        //   return this.option.push(this.fb.group({
        //     optionId: item.optionId,
        //     productSkuOptionsId: new FormControl()
        //   }));
        // });
      });



  }


  saveUpdateProductSku() {

    this.productSkuDataservice.upDateProductSkuById(this.id, this.Updateform.value).subscribe(data => {
      console.log(data);
       alert('successfully updated');
     
    }, errormsg => {
      alert('Something Went wrong');
    }
    ).add(() => {
      this.loading = false;
    });
    console.log(this.Updateform.value);

  }

  onSubmit() {
    console.log(this.Updateform.value);
    if (this.productSku.status === true) {
      this.productSku.status = 'Available';
    } else if (this.productSku.status === false) {
      this.productSku.status = 'Not-Available';
    }
    this.Updateform.patchValue({
      status: this.productSku.status
    });
    this.saveUpdateProductSku();
    this.loading = true;
    window.location.reload();
    //  this.saveUploadImage();


    const formData = new FormData();
    // for(let i=0;i<this.selectedFile.length;i++){
    formData.append('file', this.selectedFile);
    // }
    this.httpClient.post(environment.addimagetoPsku + this.id, formData).subscribe(
      response => console.log('image_added', response),

      error => console.error(error)
    );

  }

  goToProductView() {
    this.router.navigate(['/admin/products/:productId', this.productSku]);
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
    this.loading = true;
    this.productSkuDataservice.deleteImgByImgId(productSkuImageId).subscribe(data => {
      console.log(data);

    }, message => {
      alert('Do you want to delete it');
    }
    ).add(() => {
      this.loading = false;
    });
    window.location.reload();
    // this.ngOnInit()
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



  addNewGst() {
    this.router.navigate(['/admin/add-new-gst'])
  }


  openModal(): void {
    this.dialog.open(SelectGstComponent, this.id).afterClosed().subscribe(result => { this.ngOnInit(); });
  }

  button() {
    this.router.navigate(['/admin/select-gst', this.id])
  }



}






