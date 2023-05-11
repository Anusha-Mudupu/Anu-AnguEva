import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductSku } from '../product-sku';
import { ProductSkuServiceService } from '../product-sku-service.service';
import { ProductSkuDataService } from '../services/productsku-data.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpEventType, HttpHeaders } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product-sku-detail',
  templateUrl: './product-sku-detail.component.html',
  styleUrls: ['./product-sku-detail.component.scss']
})
export class ProductSkuDetailComponent implements OnInit {
 // productSku: ProductSku = new ProductSku()
   productSku:any
  id: any;
 isDisabled: boolean = true;
 selectedFile:File;
 imageBaseUrl:any;
  image:any;
  myfiles:any=[];
  isPrimary:boolean=true;
  isEditMode=true;

 constructor(private domSanitizer: DomSanitizer, private httpClient: HttpClient, private router: Router, private route: ActivatedRoute, private productskuservice: ProductSkuServiceService, private productSkuDataservice: ProductSkuDataService) { }

  // onSelect()
  // {
  //   this.router.navigate(["/admin/product-sku-detail",this.id]);

  // }
  Updateform = new FormGroup({
    productSkuId: new FormControl('', Validators.compose([Validators.required])),
    price: new FormControl('', Validators.compose([Validators.required])),
    productSkuCd: new FormControl('', Validators.compose([Validators.required])),
    count: new FormControl('', Validators.compose([Validators.required])),
    Discount: new FormControl('', Validators.compose([Validators.required])),
    barcode: new FormControl('', Validators.compose([Validators.required])),
    Description: new FormControl('', Validators.compose([Validators.required])),
    productId: new FormControl('', Validators.compose([Validators.required])),
    status: new FormControl('', Validators.compose([Validators.required])),
    profile:new FormControl('',Validators.compose([Validators.required]))
  })

  ngOnInit(): void {
    this.edit()
 this.imageBaseUrl=environment.imagesBaseUrl
this.id = this.route.snapshot.params['productSkuId']
    console.log(this.id)
    this.productSkuDataservice.getProductSkuByID(this.id).subscribe(
      (response) => {
        this.productSku = response[0];
       console.log(this.productSku);
       console.log(this.productSku.productSkuImage);
    
       //this.imageBaseUrl= environment.imagesBaseUrl + this.productSku.productSkuImage;

      });

      this.productSkuDataservice.getImageBySkuId(this.id).subscribe((data:any)=>{
        this.image=data;
        console.log(this.image);
        console.log(environment.imagesBaseUrl)
        })
     }

 

 saveUpdateProductSku() {
  this.productSkuDataservice.upDateProductSkuById(this.id,this.productSku).subscribe(data => {
      console.log(data);
      alert('successfully updated');
    })
  }

  onSubmit() {
 
    if(this.productSku.status===true){
      this.productSku.status='Available'
    }
    else
    if(this.productSku.status===false){
      this.productSku.status='Not-Available'
    }
    this.saveUpdateProductSku();
    // this.saveUploadImage();
    this.router.navigate(['/admin/products/:productId',this.productSku]);

    const formData = new FormData();
    // for(let i=0;i<this.selectedFile.length;i++){
    formData.append('file', this.selectedFile);
    // }
    this.httpClient.post('http://localhost:8085/api/file/upload/'+this.id, formData).subscribe(
      response => console.log('image_added',response),
      error => console.error(error)
    );

}


  cancel() {
    this.router.navigate(['/admin/products/:productId',this.productSku])
    alert('Youre Changes are not saved Do you Want to Cancel It ');
  }
  onFileSelected(event:any) {
    // for(let i=0;i<(event.target.files.length);i++){
    this.selectedFile =<File> event.target.files[0];
  //   this.myfiles.push(event.target.files[i]);
  //   this.Updateform.get('profile')?.setValue(this.myfiles)
  // }
  }
  // onUpload() {
  //   const formData = new FormData();
  //   formData.append('file', this.selectedFile);
  //   this.httpClient.post('http://localhost:8085/api/file/upload/'+this.id, formData).subscribe(
  //     response => console.log(response),
  //     error => console.error(error)
  //   );
   //}

deleteimage(productSkuImageId:number){
  this.productSkuDataservice.deleteImgByImgId(productSkuImageId).subscribe(data=>{
    console.log(data);
    window.location.reload()
  },message=>{
    alert('Do you want to delete it')
  })
}

// setPrimary() {
//   this.image.isPrimary = true;
//   this.updateBackend();
// }

// updateBackend() {
//   const url = 'http://localhost:8085/api/file/upload/' + this.id;
//   this.httpClient.patch(url, { isPrimary: true }).subscribe(
//     response => console.log('Backend update successful!', response),
//     error => console.log('Backend update failed!', error)
//   );
// }
edit (){
   this.isEditMode=!this.isEditMode
  if (this.isEditMode ==true) {
    this.Updateform.enable();  
  } 
  else
  if(this.isEditMode==false) {
    this.Updateform.disable();
   
  }
}

AddOptions(){
  this.router.navigate(['/admin/add-options',this.id])
}
}






